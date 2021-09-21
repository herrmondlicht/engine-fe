import React, { useEffect, useMemo } from "react";

import { Button, Input, Title, TITLE_SIZES } from "ui-fragments";
import { yup, handleCurrencyFieldChange, toBRL, fromBRL } from "utils";
import { useCustomForm } from "hooks";

const financialDetailsSchema = yup.object({
  odometerReading: yup.string().required(),
  servicePrice: yup.string().required(),
  observations: yup.string(),
  discountPrice: yup.string(),
});

const createFinancialDetails = () =>
  function FinancialDetails({ financialData, onSaveService }) {
    const {
      formMethods: { register, watch, setValue },
    } = useCustomForm({
      schema: financialDetailsSchema,
      preloadedData: financialData,
    });

    const [updatedServicePrice, discountPrice] = watch([
      "servicePrice",
      "discountPrice",
    ]);
    const servicePriceControl = register("servicePrice");
    const serviceDiscountControl = register("discountPrice");

    const totalPrice = useMemo(
      () =>
        financialData.service_items_price +
        Number(fromBRL(updatedServicePrice || 0)) -
        Number(fromBRL(discountPrice || 0)),
      [discountPrice, financialData.service_items_price, updatedServicePrice]
    );

    useEffect(() => {
      setValue(
        "servicePrice",
        handleCurrencyFieldChange(
          Number(financialData.service_price).toFixed(2)
        )
      );
    }, [financialData.service_price, setValue]);

    useEffect(() => {
      setValue(
        "discountPrice",
        handleCurrencyFieldChange(
          Number(financialData.discount_price).toFixed(2)
        )
      );
    }, [financialData.discount_price, setValue]);

    return (
      <div className="flex flex-col w-full gap-3">
        <div className="flex w-full flex-col md:flex-row md:divide-x md:gap-8">
          <div className="flex flex-col w-full flex-1 gap-3">
            <Input
              fw
              label="Quilomentragem"
              type="number"
              {...register("odometerReading")}
            />
            <Input
              fw
              label="Valor Serviço"
              {...servicePriceControl}
              onChange={e => {
                const value = handleCurrencyFieldChange(e.target.value);
                e.target.value = value;
                servicePriceControl.onChange(e);
              }}
            />
            <Input
              fw
              label="Valor de Peças"
              value={toBRL(financialData.service_items_price)}
              disabled
            />
            <Input
              fw
              label="Desconto"
              {...serviceDiscountControl}
              onChange={e => {
                const value = handleCurrencyFieldChange(e.target.value);
                e.target.value = value;
                serviceDiscountControl.onChange(e);
              }}
            />
          </div>
          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="hidden md:block">
              <Title size={TITLE_SIZES.BIG}>Total</Title>
              <Title size={TITLE_SIZES.HUGE_2x}>{toBRL(totalPrice)}</Title>
            </div>
            <div className="block mt-10 md:hidden">
              <Title size={TITLE_SIZES.MEDIUM}>Total</Title>
              <Title size={TITLE_SIZES.BIG}>{toBRL(totalPrice)}</Title>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <Input
            label="Observações"
            fw
            as="textarea"
            rows={5}
            {...register("observations")}
          />
          <div className="flex justify-end mt-3">
            <div className="w-full md:w-60">
              <Button fw onClick={onSaveService}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default createFinancialDetails();
