import React, { useCallback, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useParams } from "react-router-dom";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";
import MinusCircleIcon from "@heroicons/react/solid/MinusCircleIcon";

import { CustomerDetails, PageTitle, FinancialDetails } from "components";
import { useNotification } from "hooks";
import {
  Card,
  Input,
  ScreenLoader,
  Text,
  Button,
  BUTTON_VARIANTS,
} from "ui-fragments";
import {
  engineAPI,
  fixPayloadKeys,
  fromBRL,
  handleCurrencyFieldChange,
  toBRL,
  yup,
} from "utils";
import { useCustomForm } from "hooks";

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
  }, [error, showErrorNotification]);
  return (
    <div className="flex flex-col gap-10 pb-10">
      <CustomerDetails customerCarId={serviceData?.data?.customer_car_id} />
      <Card>
        <PageTitle title="Peças" description="Serviço" />
        <div className="mt-4">
          <ScreenLoader isLoading={isValidating}>
            <ServiceItemsFetcher serviceId={serviceId} />
          </ScreenLoader>
        </div>
      </Card>
      <Card>
        <ScreenLoader isLoading={isValidating}>
          {serviceData?.data && (
            <FinancialDetails financialData={serviceData?.data} />
          )}
        </ScreenLoader>
      </Card>
    </div>
  );
};

const ServiceItemsFetcher = ({ serviceId }) => {
  const { showErrorNotification } = useNotification();
  const { mutate } = useSWRConfig();
  const {
    data: serviceItemsData,
    error,
    isValidating,
    revalidate,
  } = useSWR(
    `services/${serviceId}/items`,
    serviceId
      ? () =>
          engineAPI.service_orders.get({
            urlExtension: `${serviceId}/items`,
          })
      : null,
    { dedupingInterval: 3000 }
  );

  useEffect(() => {
    if (error) {
      showErrorNotification({
        message: "Não conseguimos carregar os items desse serviço",
      });
    }
  }, [error, showErrorNotification]);

  const submitServiceItem = useCallback(
    values => {
      try {
        engineAPI.service_orders.patch({
          urlExtension: `${serviceId}/items/${values?.id}`,
          data: fixPayloadKeys(values),
        });
      } catch (e) {
        showErrorNotification({
          id: "ErrorServiceItemUpdate",
          message: "Os itens do serviço não foram atualizados",
        });
      }
    },
    [serviceId, showErrorNotification]
  );

  const addNewItem = async () => {
    try {
      await engineAPI.service_orders.post({
        urlExtension: `${serviceId}/items`,
      });
      revalidate();
    } catch (e) {
      showErrorNotification({
        id: "ErrorServiceItemUpdate",
        message: "Item não adicionado",
      });
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
      mutate(`services/${serviceId}/items`, {
        data: serviceItemsData?.data?.filter(removeItemFromList(id)),
      });
    } catch (e) {
      showErrorNotification({
        id: "ErrorServiceItemUpdate",
        message: "Item não excluído. Tente novamente",
      });
    }
  };

  const removeItemFromList = id =>
    serviceItemsData?.data?.filter(serviceItem => serviceItem.id !== id);

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
            <div className="flex-1 mr-12">
              <Text>Preço Total</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          {serviceItemsData?.data?.map(serviceItem => (
            <div key={serviceItem?.id}>
              <ServiceItem
                serviceItem={serviceItem}
                onSubmitChanges={submitServiceItem}
                onDeleteItem={deleteItem}
              />
            </div>
          ))}
          <div className="flex justify-center">
            <Button variant={BUTTON_VARIANTS.GHOST} onClick={addNewItem}>
              <PlusCircleIcon className="text-black text-sm h-10 w-10" />
            </Button>
          </div>
        </div>
      </div>
    </ScreenLoader>
  );
};

const ServiceItem = ({ serviceItem, onSubmitChanges, onDeleteItem }) => {
  const {
    formMethods: { register, watch, setValue, formState },
  } = useCustomForm({ schema: serviceItemSchema, preloadedData: serviceItem });
  const isDirty = formState.isDirty;
  const [quantity, unitPrice, description] = watch([
    "quantity",
    "unitPrice",
    "description",
  ]);

  const unitPriceControl = register("unitPrice");

  useEffect(() => {
    setValue(
      "unitPrice",
      handleCurrencyFieldChange(Number(serviceItem.unit_price).toFixed(2))
    );
  }, [serviceItem.unit_price, setValue]);

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
        <div className="flex justify-center items-center">
          <Button
            size="small"
            variant={BUTTON_VARIANTS.GHOST}
            onClick={() => onDeleteItem(serviceItem?.id)}
          >
            <MinusCircleIcon className="text-error-0 text-sm h-7 w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
