import React, { useMemo } from "react";
import useSWR from "swr";

import { useNotification } from "hooks";
import { convertAPIkeyToForm, engineAPI, fixPayloadKeys } from "utils";
import {
  Button,
  BUTTON_COMPONENT,
  Label,
  ScreenLoader,
  Text,
  TEXT_ALIGN,
  Title,
  TITLE_SIZES,
  TITLE_SPACING,
} from "ui-fragments";

const CustomerDetails = ({ customerCarId }) => {
  const { showErrorNotification } = useNotification();
  const {
    data: customerData,
    isValidating,
    error,
  } = useSWR(
    `customer_cars/${customerCarId}`,
    customerCarId
      ? () =>
          engineAPI.customer_cars.get({
            urlExtension: `${customerCarId}?include=customers,cars`,
          })
      : null,
    {
      onError: () =>
        showErrorNotification({
          id: "customerDetails",
          message: "Não conseguimos acessar os detalhes do cliente ☹️",
        }),
      shouldRetryOnError: false,
    }
  );

  return (
    <ScreenLoader isLoading={!customerData && !error}>
      <div className="flex flex-col w-full gap-10 mt-5">
        {!isValidating && (
          <DisplayCustomerDetails customerData={customerData?.data} />
        )}
      </div>
    </ScreenLoader>
  );
};

const DisplayCustomerDetails = ({
  customerData: {
    customers = {},
    cars = {},
    customer_cars: customerCars = {},
  } = {},
}) => {
  const customerSanitized = useMemo(() => {
    return fixPayloadKeys(customers, {
      fieldTranslator: convertAPIkeyToForm,
    });
  }, [customers]);

  const carSanitized = useMemo(() => {
    return fixPayloadKeys(cars, {
      fieldTranslator: convertAPIkeyToForm,
    });
  }, [cars]);

  const customerCarSanitized = useMemo(() => {
    return fixPayloadKeys(customerCars, {
      fieldTranslator: convertAPIkeyToForm,
    });
  }, [customerCars]);

  return (
    <div>
      <div className="flex flex-col sm:divide-y sm:divide-y-1 md:divide-y-0 gap-8 md:flex-row md:gap-8 md:divide-x divide-black">
        <div className="flex-1">
          <Title
            size={TITLE_SIZES.SMALL}
            color="text-gray-500"
            spacing={TITLE_SPACING.WIDE}
          >
            {customerSanitized.fullname?.toUpperCase()}
          </Title>
          <div className="flex flex-col gap-3 justify-center mt-3">
            <LineInfo title="Email" description={customerSanitized.email} />
            <LineInfo title="Telefone" description={customerSanitized.phone} />
            <LineInfo
              title="Endereço"
              description={customerSanitized.address}
            />
            <LineInfo
              title="CPF"
              description={customerSanitized.documentNumber}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="sm:mt-8 md:mt-0 md:ml-8">
            <Title
              size={TITLE_SIZES.SMALL}
              color="text-error-1"
              spacing={TITLE_SPACING.WIDE}
            >
              {customerCarSanitized.licensePlate} • {carSanitized.model}
            </Title>
            <div className="flex flex-col gap-3 justify-center mt-3">
              <LineInfo
                title="Placa"
                description={customerCarSanitized.licensePlate}
              />
              <LineInfo title="Cor" description={customerCarSanitized.color} />
              <LineInfo title="Modelo" description={carSanitized.model} />
              <LineInfo title="Marca" description={carSanitized.make} />
              <LineInfo
                title="Ano"
                description={carSanitized.manufactureYear}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button
          as={BUTTON_COMPONENT.LINK}
          href={`/customer_car/${customerCarSanitized.id}`}
        >
          Editar informações
        </Button>
      </div>
    </div>
  );
};

const LineInfo = ({ title, description }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Label>{title}</Label>
      <div className="flex flex-1 md:justify-end">
        <Text align={TEXT_ALIGN.RIGHT}>{description || "-"}</Text>
      </div>
    </div>
  );
};

export { CustomerDetails };
