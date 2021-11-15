import React, { useState } from "react";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";

import { AddServiceButton, CustomerDetails, PageTitle } from "components";
import { Card, ScreenLoader, Text } from "ui-fragments";
import { useNotification } from "hooks";
import { engineAPI } from "utils";

import { DeleteServiceModal } from "./DeleteServiceModal";
import { CustomerServiceTable } from "./CustomerServiceTable";
import { NotesModal } from "./NotesModal";

const CustomerPage = () => {
  const { customer_car_id } = useParams();
  const history = useHistory();
  const { showErrorNotification } = useNotification();
  const [serviceDeleteId, setServiceIdDelete] = useState(null);
  const [notesModalData, setNotesModalData] = useState(null);

  const {
    data: clientServices,
    isValidating,
    mutate,
  } = useSWR(
    `/customer_cars/${customer_car_id}/services`,
    () =>
      engineAPI.customer_cars.get({
        urlExtension: `${customer_car_id}/services`,
      }),
    {
      onError: () =>
        showErrorNotification({
          id: "clientServiceFetchError",
          message:
            "Opa! Não deu pra carregar a lista de serviços desse cliente",
        }),
    }
  );

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <PageTitle description="Cliente" />
        <CustomerDetails customerCarId={customer_car_id} />
      </Card>
      <Card>
        <PageTitle description="Serviços" />
        <ScreenLoader isLoading={!clientServices?.data || isValidating}>
          {
            <CustomerServiceTable
              data={clientServices?.data}
              onDelete={({ id }) => setServiceIdDelete(id)}
              onNotesClick={({ observations }) =>
                setNotesModalData(observations)
              }
            />
          }
          <div className="flex w-full justify-center items-center mt-3">
            <AddServiceButton
              customerCarId={customer_car_id}
              onServiceAdd={data =>
                history.push(`/services/${data.id}`, {
                  redirect: `/customers/${customer_car_id}`,
                })
              }
            >
              <PlusCircleIcon className="text-white text-sm h-7 w-7" />
              <Text>Nova Ordem de Serviço</Text>
            </AddServiceButton>
          </div>
        </ScreenLoader>
      </Card>
      <DeleteServiceModal
        serviceId={serviceDeleteId}
        setServiceId={id => {
          if (!id) {
            mutate(
              clientServices?.data?.filter(service => service.id !== id),
              true
            );
          }
          setServiceIdDelete(id);
        }}
      />
      <NotesModal notes={notesModalData} setNote={setNotesModalData} />
    </div>
  );
};

export default CustomerPage;
