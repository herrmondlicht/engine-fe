import React, { useState, useEffect, useCallback, useMemo } from "react";
import Delete from "@heroicons/react/solid/TrashIcon";
import { useHistory } from "react-router-dom";

import { engineAPI } from "utils";
import { SearchBar, ConfirmDeleteModal, PageTitle, Table } from "components";
import { Button, BUTTON_VARIANTS, Card } from "ui-fragments";

export const createCustomerCarList = ({ engineAPI }) =>
  function CustomerCarList() {
    const history = useHistory();
    const [dataArray, setData] = useState([]);
    const [research, setResearch] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idPendingDelete, setIdPendingDelete] = useState(null);

    const getListData = useCallback(async () => {
      try {
        const response = await engineAPI.customer_cars.get({
          urlExtension: "?include=cars,customers",
        });
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    }, []);

    const handleModalClose = useCallback(() => {
      setIdPendingDelete(null);
      setIsDeleteModalOpen(false);
    }, []);

    const deleteClient = useCallback(() => {
      try {
        setData(oldData =>
          oldData.filter(data => data.customer_cars.id !== idPendingDelete)
        );
        handleModalClose();
        engineAPI.customer_cars.delete({
          urlExtension: idPendingDelete,
        });
      } catch (error) {
        console.log(error);
      }
    }, [idPendingDelete, handleModalClose]);

    const onListRowDeleteClick = useCallback(({ id }) => {
      setIdPendingDelete(id);
      setIsDeleteModalOpen(true);
    }, []);

    const addNewCustomer = useCallback(
      e => {
        e.preventDefault();
        history.push("/customer_car");
      },
      [history]
    );

    const filteredData = useMemo(
      () =>
        dataArray.filter(
          data =>
            data.customer_cars.license_plate
              .toLowerCase()
              .includes(research.toLocaleLowerCase()) ||
            data.customers.fullname
              .toLowerCase()
              .includes(research.toLocaleLowerCase()) ||
            data.cars.model.toLowerCase().includes(research.toLocaleLowerCase())
        ),
      [research, dataArray]
    );

    useEffect(() => {
      getListData();
    }, [getListData]);

    return (
      <>
        <Card className="flex w-full flex-col">
          <PageTitle title="Clientes" description="Lista de Clientes" />
          <SearchBar addAction={addNewCustomer} setResearch={setResearch} />
          <div className="mt-8">
            <ClientsTable data={filteredData} onDelete={onListRowDeleteClick} />
          </div>
        </Card>
        <ConfirmDeleteModal
          handleClose={handleModalClose}
          isOpen={isDeleteModalOpen}
          onConfirmationClick={deleteClient}
        />
      </>
    );
  };

const ClientsTable = ({ data = [], onDelete }) => {
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        Header: "Placa",
        accessor: row => {
          return row?.customer_cars?.license_plate;
        },
      },
      {
        Header: "Modelo",
        accessor: row => {
          return row?.cars?.model;
        },
      },
      {
        Header: "Cliente",
        accessor: row => {
          return row?.customers?.fullname;
        },
      },
      {
        Header: "Ano do Veículo",
        accessor: row => {
          return row?.cars?.manufacture_year;
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
                onDelete({ id: row?.original?.customer_cars?.id });
              }}
            >
              <Delete className="text-error-1 w-7 h-7" />
            </Button>
          </div>
        ),
      },
    ],
    [onDelete]
  );
  return (
    <Table
      data={data}
      columns={columns}
      onRowClick={row => history.push(`/customers/${row?.customer_cars.id}`)}
    />
  );
};

export default createCustomerCarList({ engineAPI });
