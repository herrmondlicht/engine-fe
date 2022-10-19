import { FormWithButton } from "components";
import React, { useMemo, useContext } from "react";

import {
  Button,
  BUTTON_VARIANTS,
  Input,
  Title,
  TITLE_SIZES,
} from "ui-fragments";
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
import { useNotification, usePrintServiceOrder } from "hooks";
import { NOTIFICATION_DURATION, NOTIFICATION_TYPES } from "context";
import { ServiceItemPriceContext } from "pages/ServicePage/ServiceItemPriceContext";

const financialDetailsSchema = yup.object({
  odometerReading: yup.string().nullable(),
  servicePrice: yup.string().nullable(),
  observations: yup.string().nullable(),
  discountPrice: yup.string().nullable(),
});

const createFinancialDetails = () =>
  function FinancialDetails({ financialData, updateServiceData }) {
    const { itemsPrice } = useContext(ServiceItemPriceContext);
    const { showErrorNotification, showNotification } = useNotification();

    const { print, isValidating } = usePrintServiceOrder(financialData.id);

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
        await engineAPI.service_orders[method]({
          urlExtension: financialData?.id,
          data: fixPayloadKeys(sanitizedForm, {
            fieldTranslator: convertFormKeyToAPI,
          }),
        });
        updateServiceData();
        showNotification({
          id: "serviceAdded",
          duration: NOTIFICATION_DURATION.SHORT,
          title: "Serviço salvo com sucesso!",
          type: NOTIFICATION_TYPES.SUCCESS,
          ...(financialData
            ? { title: "Serviço atualizado!", type: NOTIFICATION_TYPES.INFO }
            : {}),
        });
      } catch (error) {
        showErrorNotification({
          id: "serviceAddedErro",
          title: "Opa algo deu errado!",
          message: "O serviço não foi salvo. Revise os dados e tente novamente",
        });
      }
    };

    return (
      <FormWithButton
        Form={props => (
          <FinancialDetailsView {...props} serviceItemsPrice={itemsPrice} />
        )}
        buttonConfig={{
          defaultTitle: "Salvar",
          titleWhenEditing: "Salvar Alterações",
          ignoreVariantChanges: true,
        }}
        title={`Serviço nº ${financialData?.id}`}
        formValidationSchema={financialDetailsSchema}
        onFormSubmit={updateFinancialDetails}
        preloadedData={financialDataToCurrency}
        description="Detalhes"
        secondaryButton={
          <Button
            showLoader={isValidating}
            variant={BUTTON_VARIANTS.SECONDARY}
            onClick={async e => {
              e.preventDefault();
              print();
            }}
          >
            Imprimir
          </Button>
        }
      />
    );
  };

const FinancialDetailsView = ({
  register,
  watch,
  serviceItemsPrice,
  errors,
}) => {
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
            error={errors.odometerReading}
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
            error={errors.servicePrice}
          />
          <Input
            fw
            label="Valor das Peças"
            value={toBRL(serviceItemsPrice)}
            disabled
            error={errors.serviceItemsPrice}
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
            error={errors.discountPrice}
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
          error={errors.observations}
        />
      </div>
    </div>
  );
};

export default createFinancialDetails();
