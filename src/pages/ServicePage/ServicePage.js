import React, { useCallback, useEffect } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";
import MinusCircleIcon from "@heroicons/react/solid/MinusCircleIcon";

import {
  CustomerDetails,
  PageTitle,
  FinancialDetails,
  NoDataMessage,
} from "components";
import { useLoader, useNotification } from "hooks";
import {
  Card,
  Input,
  ScreenLoader,
  Text,
  Button,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
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
            <ServiceItemsFetcher
              serviceId={serviceId}
              updateServiceData={mutateServiceData}
            />
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

const ServiceItemsFetcher = ({ serviceId, updateServiceData }) => {
  const { showErrorNotification } = useNotification();
  const [isLoading, setIsLoading] = useLoader(false);
  const {
    data: serviceItemsData,
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
      dedupingInterval: 3000,
      onError: () =>
        showErrorNotification({
          message: "Não conseguimos carregar os items desse serviço",
        }),
    }
  );

  const submitServiceItem = useCallback(
    async values => {
      try {
        await engineAPI.service_orders.patch({
          urlExtension: `${serviceId}/items/${values?.id}`,
          data: fixPayloadKeys(values),
        });
        updateServiceData();
      } catch (e) {
        showErrorNotification({
          id: "ErrorServiceItemUpdate",
          message: "Os itens do serviço não foram atualizados",
        });
      }
    },
    [serviceId, showErrorNotification, updateServiceData]
  );

  const addNewItem = async () => {
    try {
      setIsLoading(true);
      await engineAPI.service_orders.post({
        urlExtension: `${serviceId}/items`,
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
      updateServiceData();
    } catch (e) {
      showErrorNotification({
        id: "ErrorServiceItemUpdate",
        message: "Item não excluído. Tente novamente",
      });
    }
  };

  const removeItemFromList = id =>
    serviceItemsData?.data?.filter?.(serviceItem => serviceItem.id !== id);

  return (
    <ScreenLoader isLoading={!error && !serviceItemsData}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 w-full">
          {serviceItemsData?.data?.length === 0 ? (
            <NoDataMessage />
          ) : (
            <ServiceItemsHeader />
          )}
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

const ServiceItemsHeader = () => (
  <>
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
  </>
);

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
            onClick={onDeleteClick}
            showLoader={isLoading}
          >
            <MinusCircleIcon className="text-error-0 text-sm h-7 w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
