import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { engineAPI } from "utils";
import { SearchBar, ConfirmDeleteModal, PageTitle } from "components";
import { Card, ScreenLoader } from "ui-fragments";
import { CustomersTable } from "./CustomersTable";

export const createCustomerCarList = ({ engineAPI }) =>
  function CustomerCarList() {
    const history = useHistory();
    const [dataArray, setData] = useState();
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
        dataArray?.filter(
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
          <ScreenLoader isLoading={!dataArray}>
            <div className="mt-8">
              <CustomersTable
                data={filteredData}
                onDelete={onListRowDeleteClick}
              />
            </div>
          </ScreenLoader>
        </Card>
        <ConfirmDeleteModal
          handleClose={handleModalClose}
          isOpen={isDeleteModalOpen}
          onConfirmationClick={deleteClient}
        />
      </>
    );
  };

export default createCustomerCarList({ engineAPI });
