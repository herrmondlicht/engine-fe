import React, { useEffect } from "react";
import useSWR from "swr";

import { useNotification } from "hooks";
import { engineAPI } from "utils";
import { ScreenLoader } from "ui-fragments";
import { CustomerForm } from "components/CustomerForms";
import { CarForm } from "components/CustomerForms/CarForm";

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
      : null
  );

  useEffect(() => {
    if (error) {
      showErrorNotification({
        id: "customerDetails",
        message: "Não conseguimos acessar os detalhes do cliente ☹️",
      });
    }
  });

  return (
    <ScreenLoader isLoading={isValidating}>
      <div className="flex flex-col w-full gap-10">
        {customerData && (
          <CustomerForm loadedCustomer={customerData?.data?.customers} />
        )}
        {customerData && <CarForm loadedData={customerData?.data} />}
        {/* {Object.values(customerData?.data || {}).map((value, index) => (
          <div className="mt-4" key={index}>
            {Object.entries(value || {}).map(([a, b], index) => (
              <div key={index}>
                {String(a)}:{String(b)}
              </div>
            ))}
          </div>
        ))} */}
      </div>
    </ScreenLoader>
  );
};

export { CustomerDetails };
