import React, { useEffect } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import { CustomerDetails, PageTitle } from "components";
import { useNotification } from "hooks";
import { Card, Input, ScreenLoader, Text, Title } from "ui-fragments";
import {
  engineAPI,
  fromBRL,
  handleCurrencyFieldChange,
  toBRL,
  yup,
} from "utils";
import { useCustomForm } from "hooks/useCustomForm";

const serviceItemSchema = yup.object().shape({
  id: yup.string(),
  description: yup.string().required(),
  serviceOrderId: yup.string(),
  serviceIypeId: yup.string(),
  quantity: yup.string().required(),
  unitPrice: yup.string().required(),
});

const ServicePage = () => {
  const { showErrorNotification } = useNotification();
  const { serviceId } = useParams();
  const {
    data: serviceData,
    isValidating,
    error,
  } = useSWR(
    `services/${serviceId}`,
    serviceId
      ? () =>
          engineAPI.service_orders.get({
            urlExtension: serviceId,
          })
      : null
  );

  useEffect(() => {
    if (error) {
      showErrorNotification({
        id: "services",
        message: "Não conseguimos acessar esse serviço ☹️",
      });
    }
  });

  return (
    <div className="flex flex-col gap-10 pb-10">
      <CustomerDetails customerCarId={serviceData?.data?.customer_car_id} />
      <Card>
        <PageTitle title="Peças" description="Serviços" />
        <div className="mt-4">
          <ScreenLoader isLoading={isValidating}>
            <ServiceItemsFetcher serviceId={serviceId} />
          </ScreenLoader>
        </div>
      </Card>
    </div>
  );
};

const ServiceItemsFetcher = ({ serviceId }) => {
  const {
    data: serviceItemsData,
    error,
    isValidating,
  } = useSWR(
    `services/${serviceId}/items`,
    serviceId
      ? () =>
          engineAPI.service_orders.get({
            urlExtension: `${serviceId}/items`,
          })
      : null
  );

  return (
    <ScreenLoader isValidating={isValidating}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <Text>Descrição</Text>
          </div>
          <div
            className="flex gap-2 flex-grow md:flex-grow-0"
            style={{ flexBasis: "400px" }}
          >
            <div className="flex-1">
              <Text>Preço Unit.</Text>
            </div>
            <div className="w-16">
              <Text>Qtd.</Text>
            </div>
            <div className="flex-1">
              <Text>Preço Total</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          {serviceItemsData?.data?.map(serviceItem => (
            <div key={serviceItem?.id}>
              <ServiceItem serviceItem={serviceItem} />
            </div>
          ))}
        </div>
      </div>
    </ScreenLoader>
  );
};

const ServiceItem = ({ serviceItem }) => {
  const {
    formMethods: { register, watch, setValue },
  } = useCustomForm({ schema: serviceItemSchema, preloadedData: serviceItem });

  const [quantity, unitPrice] = watch(["quantity", "unitPrice"]);

  const unitPriceControl = register("unitPrice");

  useEffect(() => {
    setValue(
      "unitPrice",
      handleCurrencyFieldChange(Number(serviceItem.unit_price).toFixed(2))
    );
  }, [serviceItem.unit_price, setValue]);

  return (
    <div className="flex gap-2 flex-1 flex-wrap">
      <div className="flex flex-grow" style={{ minWidth: "250px" }}>
        <div className="flex-1">
          <Input fw {...register("description")} />
        </div>
      </div>
      <div
        className="flex gap-2 flex-grow md:flex-grow-0"
        style={{ flexBasis: "400px" }}
      >
        <div className="flex flex-1">
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
        <div className="w-16">
          <Input fw {...register("quantity")} />
        </div>
        <div className="flex flex-1">
          <Input
            fw
            value={toBRL(Number(quantity) * Number(fromBRL(unitPrice)))}
            disabled
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
