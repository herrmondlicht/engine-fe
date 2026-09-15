import React from "react";
import ArrowRightIcon from "@heroicons/react/solid/ArrowRightIcon";
import { useHistory } from "react-router-dom";
import useSWR from "swr";

import { PageTitle } from "components";
import {
  Card,
  ScreenLoader,
  TEXT_SIZES,
  Text,
  Title,
  TITLE_SIZES,
} from "ui-fragments";

const ORDER_STATUS_LABELS = {
  in_progress: "Em andamento",
  canceled: "Cancelada",
  waiting_payment: "Aguardando pagamento",
  paid: "Paga",
  draft: "Rascunho",
};

const getServiceOrder = serviceOrder =>
  serviceOrder?.service_orders || serviceOrder;

export const createLatestServiceOrders = ({ engineAPI }) =>
  function LatestServiceOrders() {
    const history = useHistory();
    const { data: latestServiceOrders, isValidating } = useSWR(
      "/service_orders?include=customer_cars&orderBy=id&order=desc&limit=5",
      () =>
        engineAPI.service_orders.get({
          params: {
            include: "customer_cars",
            orderBy: "id",
            order: "desc",
            limit: 5,
          },
        })
    );

    const serviceOrders = latestServiceOrders?.data || [];

    return (
      <Card className="mb-8 flex w-full flex-col">
        <PageTitle
          title="Ordens de Serviço"
          description="Últimas 5 Ordens de Serviço"
        />
        <ScreenLoader isLoading={!latestServiceOrders && isValidating}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {serviceOrders.map(serviceOrderRow => {
              const serviceOrder = getServiceOrder(serviceOrderRow);
              const customerCar = serviceOrderRow?.customer_cars;

              return (
                <button
                  className="flex min-h-32 flex-col rounded-2xl bg-gray-50 p-4 text-left transition hover:bg-gray-100"
                  key={serviceOrder.id}
                  onClick={() =>
                    history.push(`/services/${serviceOrder.id}`, {
                      redirect: "/customers",
                    })
                  }
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Text color="text-gray-500" size={TEXT_SIZES.SMALL}>
                      Ordem #{serviceOrder.id}
                    </Text>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <Title size={TITLE_SIZES.SMALL}>
                    {customerCar?.license_plate || "Veículo não informado"}
                  </Title>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                    <Text color="text-gray-500" size={TEXT_SIZES.VERY_SMALL}>
                      {new Date(serviceOrder.created_at).toLocaleDateString(
                        "pt-BR",
                        {
                          timeZone: "UTC",
                        }
                      )}
                    </Text>
                    <Text color="text-gray-600" size={TEXT_SIZES.VERY_SMALL}>
                      {ORDER_STATUS_LABELS[serviceOrder.order_status]}
                    </Text>
                  </div>
                </button>
              );
            })}
          </div>
        </ScreenLoader>
      </Card>
    );
  };
