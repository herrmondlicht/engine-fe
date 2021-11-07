import React, { useMemo, useState } from "react";
import Delete from "@heroicons/react/solid/TrashIcon";
import Annotation from "@heroicons/react/solid/AnnotationIcon";
import PlusCircleIcon from "@heroicons/react/solid/PlusCircleIcon";

import { useHistory, useParams } from "react-router";
import useSWR from "swr";

import {
  ConfirmDeleteModal,
  CustomerDetails,
  PageTitle,
  Table,
} from "components";
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Card,
  Modal,
  ScreenLoader,
  Text,
} from "ui-fragments";
import { useNotification } from "hooks";
import { engineAPI, fixPayloadKeys, toBRL } from "utils";

const ClientPage = () => {
  const { customer_car_id } = useParams();
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
            <ClientServiceTable
              data={clientServices?.data}
              onDelete={({ id }) => setServiceIdDelete(id)}
              onNotesClick={({ observations }) =>
                setNotesModalData(observations)
              }
            />
          }
          <div className="flex w-full justify-center items-center mt-3">
            <AddServiceButton customerCarId={customer_car_id} />
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

const ClientServiceTable = ({ data = [], onDelete, onNotesClick }) => {
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        Header: "Mão de Obra",
        accessor: row => {
          return toBRL(row?.service_price);
        },
      },
      {
        Header: "Preço das peças",
        accessor: row => {
          return toBRL(row?.service_items_price);
        },
      },
      {
        Header: "Desconto",
        accessor: row => {
          return toBRL(row?.discount ?? 0);
        },
      },
      {
        Header: "Data",
        accessor: row => {
          return new Date(row?.created_at)?.toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          });
        },
      },
      {
        Header: "Ações",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant={BUTTON_VARIANTS.GHOST}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onNotesClick?.(row?.original);
              }}
            >
              <Annotation className="w-7 h-7" />
            </Button>
            <Button
              variant={BUTTON_VARIANTS.GHOST}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onDelete?.(row?.original);
              }}
            >
              <Delete className="text-error-1 w-7 h-7" />
            </Button>
          </div>
        ),
      },
    ],
    [onDelete, onNotesClick]
  );

  return (
    <Table
      data={data}
      columns={columns}
      onRowClick={row =>
        history.push(`/services/${row?.id}`, {
          redirect: `/customers/${row?.customer_car_id}`,
        })
      }
    />
  );
};

const AddServiceButton = ({ customerCarId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useHistory();
  const { showErrorNotification } = useNotification();
  const onButtonClick = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await engineAPI.service_orders.post({
        data: fixPayloadKeys({ customerCarId }),
      });
      if (!data?.id) throw new Error("No service ID found");
      push(`/services/${data.id}`, {
        redirect: `/customers/${customerCarId}`,
      });
    } catch (e) {
      showErrorNotification({
        message: "Nāo consegui adicionar o serviço ",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={BUTTON_SIZES.SMALL}
      showLoader={isLoading}
      onClick={onButtonClick}
    >
      <div className="flex items-center gap-3">
        <PlusCircleIcon className="text-white text-sm h-7 w-7" />
        <Text>Nova Ordem de Serviço</Text>
      </div>
    </Button>
  );
};

const DeleteServiceModal = ({ serviceId, setServiceId }) => {
  const { showErrorNotification } = useNotification();
  const [isLoading, setIsLoading] = useState();
  const deleteService = async () => {
    setIsLoading(true);
    try {
      await engineAPI.service_orders.delete({
        urlExtension: serviceId,
      });
      setIsLoading(false);
      setServiceId(null);
    } catch (e) {
      showErrorNotification();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ConfirmDeleteModal
      handleClose={() => setServiceId(undefined)}
      isOpen={!!serviceId}
      onConfirmationClick={deleteService}
      isLoading={isLoading}
    />
  );
};

const NotesModal = ({ notes, setNote }) => {
  return (
    <Modal
      handleClose={() => setNote(null)}
      isOpen={!!notes}
      title="Observações"
    >
      <div className="flex w-80 flex-col gap-5">
        <div className="flex justify-center items-center p-4 border border-solid rounded-lg">
          <Text>{notes}</Text>
        </div>
        <div className="flex items-end justify-end">
          <Button onClick={() => setNote(null)}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClientPage;
