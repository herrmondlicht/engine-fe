import React, { useState, useEffect, useCallback } from "react";
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
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

import engineAPI from "utils/engineAPI/engineAPI";

export const createCustomerCarList = ({ engineAPI }) =>
  function CustomerCarList() {
    const [data, setData] = useState([]);

    const getListData = useCallback(async () => {
      try {
        const response = await engineAPI.customer_cars.get({
          urlExtension: "?include=cars,customers",
        });
        console.log(response);
        setData(response.data.data);
      } catch (e) {}
    }, []);

    useEffect(() => {
      getListData();
    }, [getListData]);

    return (
      <div className="flex flex-col w-full h-full justify-center overflow-hidden">
        <div className="h-full w-full px-4 pb-16">
          <Paper variant="outlined" className="h-full w-full p-10 overflow-hidden">
            <div className="mb-6">
              <Typography variant="h5">Lista de Clientes</Typography>
            </div>
            <Divider variant="fullWidth" />
            <div className="flex items-center mt-10">
              <div className="w-1/2">
                <TextField
                  label="Pesquisar por Placa"
                  variant="outlined"
                  size="small"
                  type="text"
                  className="w-full"
                />
              </div>
              <div className="w-10">
                <IconButton variant="outlined" color="primary">
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
            <div className="w-full h-full my-4 overflow-auto">
              <ClientsTable data={data} />
            </div>
          </Paper>
        </div>
      </div>
    );
  };

const ClientsTable = ({ data = [] }) => {
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
              <TableRow key={customerCar.id}>
                <TableCell component="th" scope="row">
                  {customerCar.license_plate}
                </TableCell>
                <TableCell align="right">{car.model}</TableCell>
                <TableCell align="right">{customer.fullname}</TableCell>
                <TableCell align="right">{car.manufacture_year}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default createCustomerCarList({ engineAPI });
