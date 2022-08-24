import React, { useCallback } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import { CustomerDetails, PageTitle, FinancialDetails } from "components";
import { useNotification } from "hooks";
import { Card, ScreenLoader } from "ui-fragments";
import { engineAPI } from "utils";
import { ServiceItemsContainer } from "./ServiceItemsContainer";

const ServicePage = () => {
  const { showErrorNotification } = useNotification();
  const { serviceId } = useParams();
  const {
    data: serviceData,
    isValidating,
    error,
    mutate,
  } = useSWR(
    `services/${serviceId}`,
    serviceId
      ? () =>
          engineAPI.service_orders.get({
            urlExtension: serviceId,
          })
      : null,
    {
      onError: () =>
        showErrorNotification({
          id: "services",
          message: "Não conseguimos acessar esse serviço ☹️",
        }),
    }
  );

  const mutateServiceData = useCallback(() => {
    mutate();
  }, [mutate]);
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Card>
        <PageTitle description="Dados do Cliente" title="Serviço" />
        <CustomerDetails customerCarId={serviceData?.data?.customer_car_id} />
      </Card>
      <Card>
        <PageTitle description="Peças" title="Serviço" />
        <div className="mt-4">
          <ScreenLoader isLoading={!error && !serviceData}>
            <ServiceItemsContainer
              serviceId={serviceId}
              updateServiceData={mutateServiceData}
            />
          </ScreenLoader>
        </div>
      </Card>
      <Card>
        <ScreenLoader isLoading={isValidating}>
          {serviceData?.data && (
            <FinancialDetails
              updateServiceData={mutateServiceData}
              financialData={serviceData?.data}
            />
          )}
        </ScreenLoader>
      </Card>
    </div>
  );
};

export default ServicePage;
