import { FormWithButton } from "components";
import React, { useMemo } from "react";

import { Input, Title, TITLE_SIZES } from "ui-fragments";
import {
  yup,
  handleCurrencyFieldChange,
  toBRL,
  fromBRL,
  getHTTPMethod,
  fixPayloadKeys,
  engineAPI,
  convertFormKeyToAPI,
} from "utils";
import { useNotification } from "hooks";
import { NOTIFICATION_DURATION, NOTIFICATION_TYPES } from "context";

const financialDetailsSchema = yup.object({
  odometerReading: yup.string().required(),
  servicePrice: yup.string().required(),
  observations: yup.string(),
  discountPrice: yup.string(),
});

const createFinancialDetails = () =>
  function FinancialDetails({ financialData }) {
    const { showErrorNotification, showNotification } = useNotification();

    const financialDataToCurrency = useMemo(() => {
      return {
        ...(financialData ? financialData : {}),
        discount_price: handleCurrencyFieldChange(
          financialData?.discount_price?.toFixed(2)
        ),
        service_price: handleCurrencyFieldChange(
          financialData?.service_price?.toFixed(2)
        ),
      };
    }, [financialData]);

    const updateFinancialDetails = async formData => {
      const method = getHTTPMethod(financialData?.id);
      try {
        const sanitizedForm = {
          ...(financialData ? financialData : {}),
          ...formData,
          servicePrice: fromBRL(formData.servicePrice),
          discountPrice: fromBRL(formData.discountPrice),
        };
        const data = await engineAPI.service_orders[method]({
          urlExtension: financialData?.id,
          data: fixPayloadKeys(sanitizedForm, {
            fieldTranslator: convertFormKeyToAPI,
          }),
        });
        showNotification({
          id: "serviceAdded",
          duration: NOTIFICATION_DURATION.SHORT,
          title: "Serviço salvo com sucesso!",
          type: NOTIFICATION_TYPES.SUCCESS,
          ...(financialData
            ? { title: "Serviço atualizado!", type: NOTIFICATION_TYPES.INFO }
            : {}),
        });
        return data?.data;
      } catch (error) {
        showErrorNotification({
          id: "serviceAddedErro",
          title: "Opa algo deu errado!",
          message: "O serviço não foi salvo. Revise os dados e tente novamente",
        });
        return {};
      }
    };

    return (
      <FormWithButton
        Form={props => (
          <FinancialDetailsView
            {...props}
            serviceItemsPrice={financialData.service_items_price}
          />
        )}
        buttonConfig={{
          defaultTitle: "Salvar",
          titleWhenEditing: "Salvar Alterações",
        }}
        title="Serviço"
        formValidationSchema={financialDetailsSchema}
        onFormSubmit={updateFinancialDetails}
        preloadedData={financialDataToCurrency}
        description="Detalhes"
      />
    );
  };

const FinancialDetailsView = ({ register, watch, serviceItemsPrice }) => {
  const [updatedServicePrice, discountPrice] = watch([
    "servicePrice",
    "discountPrice",
  ]);
  const servicePriceControl = register("servicePrice");
  const serviceDiscountControl = register("discountPrice");

  const totalPrice = useMemo(
    () =>
      serviceItemsPrice +
      Number(fromBRL(updatedServicePrice || 0)) -
      Number(fromBRL(discountPrice || 0)),
    [discountPrice, serviceItemsPrice, updatedServicePrice]
  );

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
            label="Valor do Serviço"
            {...servicePriceControl}
            onChange={e => {
              const value = handleCurrencyFieldChange(e.target.value);
              e.target.value = value;
              servicePriceControl.onChange(e);
            }}
          />
          <Input
            fw
            label="Valor das Peças"
            value={toBRL(serviceItemsPrice)}
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
      </div>
    </div>
  );
};

export default createFinancialDetails();
