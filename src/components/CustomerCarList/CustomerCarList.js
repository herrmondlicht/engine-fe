import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Paper,
  TextField,
  IconButton,
  Typography,
  Divider,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Button,
} from "@material-ui/core";
import { Search as SearchIcon, Delete, AddCircle } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import engineAPI from "utils/engineAPI/engineAPI";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

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
        setData(response.data.data);
      } catch (e) {}
    }, []);

    const handleModalClose = useCallback(() => {
      setIdPendingDelete(null);
      setIsDeleteModalOpen(false);
    }, []);

    const deleteClient = useCallback(() => {
      try {
        setData((oldData) =>
          oldData.filter((data) => data.customer_cars.id !== idPendingDelete)
        );
        handleModalClose();
        engineAPI.customer_cars.delete({
          urlExtension: idPendingDelete,
        });
      } catch (error) {}
    }, [idPendingDelete, handleModalClose]);

    const onListRowDeleteClick = useCallback(({ id }) => {
      setIdPendingDelete(id);
      setIsDeleteModalOpen(true);
    }, []);

    const addNewCustomer = useCallback(
      (e) => {
        e.preventDefault();
        history.push("/customers/new");
      },
      [history]
    );

    const filteredData = useMemo(
      () =>
        dataArray.filter((data) => {
          return (
            data.customer_cars.license_plate
              .toLowerCase()
              .includes(research.toLocaleLowerCase()) ||
            data.customers.fullname
              .toLowerCase()
              .includes(research.toLocaleLowerCase()) ||
            data.cars.model.toLowerCase().includes(research.toLocaleLowerCase())
          );
        }),
      [research, dataArray]
    );

    useEffect(() => {
      getListData();
    }, [getListData]);

    return (
      <>
        <div className="flex w-full h-full overflow-hidden px-4 pb-16">
          <Paper
            variant="outlined"
            className="flex flex-col h-full w-full p-10 overflow-hidden"
          >
            <Typography variant="h5">Lista de Clientes</Typography>
            <Divider variant="fullWidth" />
            <div className="flex items-center mt-10">
              <div className="w-1/2 sm:w-full flex items-center">
                <TextField
                  onChange={(e) => setResearch(e.target.value)}
                  label="Pesquisar"
                  variant="outlined"
                  size="small"
                  type="text"
                  className="w-full"
                />
                <div className="w-10 ml-1">
                  <IconButton variant="outlined" color="primary">
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
              <div className="w-1/2 sm:w-full flex justify-end">
                <Button
                  onClick={addNewCustomer}
                  color="primary"
                  variant="contained"
                  startIcon={<AddCircle />}
                >
                  Adicionar
                </Button>
              </div>
            </div>
            <div className="my-4 h-full overflow-auto">
              <ClientsTable
                data={filteredData}
                onDelete={onListRowDeleteClick}
              />
            </div>
          </Paper>
        </div>
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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Placa</TableCell>
            <TableCell align="right">Modelo</TableCell>
            <TableCell align="right">Cliente</TableCell>
            <TableCell align="right">Ano do veículo</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="h-full">
          {data.map(
            ({
              cars: car,
              customers: customer,
              customer_cars: customerCar,
            }) => (
              <TableRow
                onClick={() =>
                  history.push(
                    `/customers/${customer.id}/cars/${customerCar.id}`
                  )
                }
                key={customerCar.id}
                className="hover:bg-gray-300 cursor-pointer"
              >
                <TableCell component="th" scope="row">
                  {customerCar.license_plate}
                </TableCell>
                <TableCell align="right">{car.model}</TableCell>
                <TableCell align="right">{customer.fullname}</TableCell>
                <TableCell align="right">{car.manufacture_year}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDelete({ id: customerCar.id });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default createCustomerCarList({ engineAPI });
