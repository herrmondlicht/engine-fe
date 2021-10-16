import React, { useState, useEffect, useCallback, useMemo } from "react";
import Delete from "@heroicons/react/solid/TrashIcon";
import { useHistory } from "react-router-dom";

import { engineAPI } from "utils";
import { SearchBar, ConfirmDeleteModal, PageTitle } from "components";
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
        history.push("/customers/new");
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
          <div className="mt-3">
            <ClientsTable data={filteredData} onDelete={onListRowDeleteClick} />
          </div>
        </Card>
        <ConfirmDeleteModal
          onConfirmationClick={deleteClient}
          handleClose={handleModalClose}
          isOpen={isDeleteModalOpen}
        />
      </>
    );
  };

const ClientsTable = ({ data = [], onDelete }) => {
  const history = useHistory();
  return (
    <table className="h-full w-full table-auto">
      <thead>
        <tr>
          <td>Placa</td>
          <td>Modelo</td>
          <td>Cliente</td>
          <td>Ano do veículo</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            { cars: car, customers: customer, customer_cars: customerCar },
            index
          ) => (
            <tr
              onClick={() =>
                history.push(`/customers/${customer.id}/cars/${customerCar.id}`)
              }
              key={customerCar.id}
              className={`hover:bg-gray-300 cursor-pointer ${
                index % 2 ? "bg-gray-100" : ""
              }`}
            >
              <td>{customerCar.license_plate}</td>
              <td>{car.model}</td>
              <td>{customer.fullname}</td>
              <td>{car.manufacture_year}</td>
              <td>
                <Button
                  variant={BUTTON_VARIANTS.GHOST}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDelete({ id: customerCar.id });
                  }}
                >
                  <Delete />
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default createCustomerCarList({ engineAPI });
