import React, { useCallback, useEffect, useRef } from "react";
import MinusCircleIcon from "@heroicons/react/solid/MinusCircleIcon";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";

import { useLoader } from "hooks";
import {
  Input,
  Button,
  BUTTON_VARIANTS,
  Label,
  Text,
  BUTTON_SIZES,
} from "ui-fragments";
import { fromBRL, handleCurrencyFieldChange, toBRL, yup } from "utils";
import { useCustomForm } from "hooks";

const serviceItemSchema = yup.object().shape({
  id: yup.string(),
  description: yup.string().required(),
  serviceOrderId: yup.string(),
  serviceTypeId: yup.string(),
  quantity: yup.string().required(),
  unitPrice: yup.string().required(),
});

const ServiceItem = ({ serviceItem, onSubmitChanges, onDeleteItem }) => {
  const [isLoading, setIsLoading] = useLoader(false);
  const currentTimer = useRef();
  const {
    formMethods: {
      register,
      watch,
      setValue,
      formState: { isDirty },
      getValues,
      reset,
    },
  } = useCustomForm({ schema: serviceItemSchema, preloadedData: serviceItem });
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
    clearTimeout(currentTimer.current);
    currentTimer.current = setTimeout(() => {
      onSubmitChanges({
        id: serviceItem.id,
        quantity: quantity || "0",
        unitPrice: fromBRL(unitPrice),
        description,
      });
    }, 1000);
  }, [
    quantity,
    unitPrice,
    description,
    onSubmitChanges,
    isDirty,
    serviceItem.id,
    reset,
  ]);

  return (
    <div className="flex flex-col md:flex-row gap-2 flex-1">
      <div className="flex flex-1">
        <div className="flex-1">
          <ServiceItemLabel text="Descrição" />
          <Input fw {...register("description")} />
        </div>
      </div>
      <div className="flex flex-1 gap-2 flex-col md:flex-row">
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
        <div className="flex-1 md:w-32">
          <ServiceItemQuantityCounter
            getValues={getValues}
            setValue={setValue}
            register={register}
          />
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

const ServiceItemQuantityCounter = ({ getValues, setValue, register }) => {
  const quantityControl = register("quantity");
  const onClickPlus = () => {
    const quantity = getValues("quantity");
    setValue("quantity", quantity + 1, { shouldDirty: true });
  };

  const onClickMinus = () => {
    const quantity = getValues("quantity");
    if (quantity > 0) setValue("quantity", quantity - 1, { shouldDirty: true });
  };
  return (
    <>
      <ServiceItemLabel text="Qtd." />
      <div className="flex flex-row gap-1 justify-center items-center">
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          size={BUTTON_SIZES.NO_PADDING}
          onClick={onClickMinus}
        >
          <MinusCircleIcon className="text-secondary-0 text-sm h-10 w-10 md:h-8 md:w-8" />
        </Button>
        <Input fw {...quantityControl} center />
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          size={BUTTON_SIZES.NO_PADDING}
          onClick={onClickPlus}
        >
          <PlusCircleIcon className="text-secondary-0 text-sm h-10 w-10 md:h-8 md:w-8" />
        </Button>
      </div>
    </>
  );
};

const ServiceItemLabel = ({ text }) => (
  <div className="flex-1 mb-1 ml-1 md:hidden">
    <Label>{text}</Label>
  </div>
);

export { ServiceItem };
