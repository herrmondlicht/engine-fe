import React, { useCallback, useEffect } from "react";
import MinusCircleIcon from "@heroicons/react/solid/MinusCircleIcon";

import { useLoader } from "hooks";
import { Input, Button, BUTTON_VARIANTS, Label, Text } from "ui-fragments";
import { fromBRL, handleCurrencyFieldChange, toBRL, yup } from "utils";
import { useCustomForm } from "hooks";

const serviceItemSchema = yup.object().shape({
  id: yup.string(),
  description: yup.string().required(),
  serviceOrderId: yup.string(),
  serviceIypeId: yup.string(),
  quantity: yup.string().required(),
  unitPrice: yup.string().required(),
});

const ServiceItem = ({ serviceItem, onSubmitChanges, onDeleteItem }) => {
  const [isLoading, setIsLoading] = useLoader(false);
  const {
    formMethods: { register, watch, setValue, formState },
  } = useCustomForm({ schema: serviceItemSchema, preloadedData: serviceItem });
  const isDirty = formState.isDirty;
  const [quantity, unitPrice, description] = watch([
    "quantity",
    "unitPrice",
    "description",
  ]);

  const unitPriceControl = register(
    "unitPrice",
    handleCurrencyFieldChange(Number(serviceItem.unit_price).toFixed(2))
  );

  const onDeleteClick = useCallback(async () => {
    setIsLoading(true);
    await onDeleteItem(serviceItem?.id);
    setIsLoading(false);
  }, [onDeleteItem, serviceItem?.id, setIsLoading]);

  useEffect(() => {
    setValue(
      "unitPrice",
      handleCurrencyFieldChange(Number(serviceItem.unit_price).toFixed(2))
    );
  }, [serviceItem, setValue]);

  useEffect(() => {
    if (!isDirty) {
      return;
    }
    const updateDeduper = setTimeout(() => {
      onSubmitChanges({
        id: serviceItem.id,
        quantity,
        unitPrice: fromBRL(unitPrice),
        description,
      });
    }, 1000);

    return () => {
      clearTimeout(updateDeduper);
    };
  }, [
    quantity,
    unitPrice,
    description,
    onSubmitChanges,
    isDirty,
    serviceItem.id,
  ]);

  return (
    <div className="flex gap-2 flex-1 flex-wrap">
      <div className="flex flex-grow min-w-[250px]">
        <div className="flex-1">
          <ServiceItemLabel text="Descrição" />
          <Input fw {...register("description")} />
        </div>
      </div>
      <div
        className="flex gap-2 flex-col md:flex-grow-0 md:flex-row"
        style={{ flexBasis: "400px" }}
      >
        <div className="flex flex-col w-full md:w-max-content md:flex-1">
          <ServiceItemLabel text="Preço Unit." />
          <Input
            fw
            {...unitPriceControl}
            onChange={e => {
              const value = handleCurrencyFieldChange(e.target.value);
              e.target.value = value;
              unitPriceControl.onChange(e);
            }}
          />
        </div>
        <div className="flex-1 md:w-16">
          <ServiceItemLabel text="Qtd." />
          <Input fw {...register("quantity")} />
        </div>
        <div className="flex flex-col flex-1">
          <ServiceItemLabel text="Preço Total" />
          <Input
            fw
            value={toBRL(Number(quantity) * Number(fromBRL(unitPrice)))}
            disabled
            readOnly
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            size="small"
            variant={BUTTON_VARIANTS.GHOST}
            onClick={onDeleteClick}
            showLoader={isLoading}
          >
            <div className="flex justify-center items-center">
              <MinusCircleIcon className="text-error-0 text-sm h-7 w-7" />
              <div className="flex justify-center items-center md:hidden ml-2">
                <Text color="text-error-0">Excluir</Text>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ServiceItemLabel = ({ text }) => (
  <div className="flex-1 mb-1 ml-1 md:hidden">
    <Label>{text}</Label>
  </div>
);

export { ServiceItem };
