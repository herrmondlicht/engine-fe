import React, { useCallback, useContext, useEffect } from "react";
import useSWR from "swr";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";

import { NoDataMessage } from "components";
import { useLoader, useNotification } from "hooks";
import { ScreenLoader, Text, Button, BUTTON_SIZES } from "ui-fragments";
import { engineAPI, fixPayloadKeys } from "utils";
import { ServiceItemsHeader } from "./ServiceItemsHeader";
import { ServiceItem } from "./ServiceItem";
import { ServiceItemPriceContext } from "./ServiceItemPriceContext";

const ServiceItemsContainer = ({ serviceId }) => {
  const { updateItemsPrice } = useContext(ServiceItemPriceContext);
  const { showErrorNotification } = useNotification();
  const [isLoading, setIsLoading] = useLoader(false);
  const {
    data: serviceItemsData = {},
    error,
    mutate,
  } = useSWR(
    `services/${serviceId}/items`,
    serviceId
      ? () =>
          engineAPI.service_orders.get({
            urlExtension: `${serviceId}/items`,
          })
      : null,
    {
      dedupingInterval: 1000,
      onError: () =>
        showErrorNotification({
          message: "Não conseguimos carregar os items desse serviço",
        }),
    }
  );

  const getMutatedItemsArray = useCallback((values, serviceItemsData = []) => {
    const updatedServiceItemsArray = serviceItemsData?.map(item => {
      if (item.id === values?.id) {
        return { ...item, ...fixPayloadKeys(values) };
      }
      return item;
    });

    return updatedServiceItemsArray;
  }, []);

  const submitServiceItem = useCallback(
    async values => {
      try {
        await engineAPI.service_orders.patch({
          urlExtension: `${serviceId}/items/${values?.id}`,
          data: fixPayloadKeys(values),
        });
        const updatedItemsArray = getMutatedItemsArray(
          values,
          serviceItemsData?.data
        );
        mutate({ data: updatedItemsArray }, { revalidate: false });
      } catch (e) {
        showErrorNotification({
          id: "ErrorServiceItemUpdate",
          message: "Os itens do serviço não foram atualizados",
        });
      }
    },
    [
      getMutatedItemsArray,
      mutate,
      serviceId,
      serviceItemsData.data,
      showErrorNotification,
    ]
  );

  const addNewItem = async () => {
    try {
      setIsLoading(true);
      await engineAPI.service_orders.post({
        urlExtension: `${serviceId}/items`,
        data: {
          quantity: 1,
        },
      });
      await mutate();
    } catch (e) {
      showErrorNotification({
        id: "ErrorServiceItemUpdate",
        message: "Item não adicionado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async id => {
    try {
      if (!id) {
        return;
      }
      await engineAPI.service_orders.delete({
        urlExtension: `${serviceId}/items/${id}`,
      });
      mutate(
        {
          data: removeItemFromList(id),
        },
        false
      );
    } catch (e) {
      showErrorNotification({
        id: "ErrorServiceItemUpdate",
        message: "Item não excluído. Tente novamente",
      });
    }
  };

  const removeItemFromList = id =>
    serviceItemsData?.data?.filter?.(serviceItem => serviceItem.id !== id);

  useEffect(() => {
    updateItemsPrice(serviceItemsData?.data);
  }, [serviceItemsData.data, updateItemsPrice]);

  return (
    <ScreenLoader isLoading={!error && !serviceItemsData}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full">
          {serviceItemsData?.data?.length === 0 ? (
            <NoDataMessage />
          ) : (
            <div className="hidden md:flex gap-2 w-full">
              <ServiceItemsHeader />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full">
          {serviceItemsData?.data?.map(serviceItem => (
            <div
              className="p-2 md:p-0 rounded-lg md:border-0 border border-solid border-slate-300"
              key={serviceItem?.id}
            >
              <ServiceItem
                serviceItem={serviceItem}
                onSubmitChanges={submitServiceItem}
                onDeleteItem={deleteItem}
              />
            </div>
          ))}
          <div className="flex justify-center">
            <Button
              size={BUTTON_SIZES.SMALL}
              onClick={addNewItem}
              showLoader={isLoading}
            >
              <div className="flex gap-3 items-center">
                <PlusCircleIcon className="text-white text-sm h-7 w-7" />
                <Text>Adicionar Peça</Text>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </ScreenLoader>
  );
};

export { ServiceItemsContainer };
