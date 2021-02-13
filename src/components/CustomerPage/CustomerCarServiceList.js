import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@material-ui/core";
import { HiTrash as Delete } from "react-icons/hi";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";

import { engineAPI } from "utils";
import { SearchBar, ConfirmDeleteModal } from "components";

console.log(engineAPI);

export const createCustomerCarServiceList = ({ engineAPI }) =>
  function CustomerCarServiceList() {
    const [services, setServices] = useState([]);
    const [customerCar, setCustomerCar] = useState({});
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idPendingDelete, setIdPendingDelete] = useState(null);
    const history = useHistory();
    const { customer_car_id: customerCarId } = useParams();

    const addNewService = useCallback(async () => {
      const { data } = await engineAPI.customer_cars.post({
        urlExtension: `${customerCarId}/services`,
        data: {
          customer_car_id: customerCarId,
          service_items_price: 0,
          service_price: 0,
        },
      });
      history.push(`/services/${data.data.id}`);
    }, [customerCarId, history]);

    const loadServices = useCallback(async () => {
      setIsLoading(true);
      try {
        const response = await engineAPI.customer_cars.get({
          urlExtension: `${customerCarId}/services?include=customer_cars`,
        });
        const responseServices = response.data.data;
        setServices(responseServices.map((service) => service.service_orders));
        setCustomerCar(responseServices[0].customer_cars);
      } catch {}
      setIsLoading(false);
    }, [customerCarId]);

    const handleModalClose = useCallback(() => {
      setIdPendingDelete(null);
      setIsDeleteModalOpen(false);
    }, []);

    const deleteService = useCallback(() => {
      try {
        setServices((oldData) =>
          oldData.filter((data) => data.id !== idPendingDelete)
        );
        handleModalClose();
        engineAPI.service_orders.delete({
          urlExtension: idPendingDelete,
        });
      } catch (error) {}
    }, [idPendingDelete, handleModalClose]);

    const onDeleteClick = useCallback(({ id }) => {
      setIdPendingDelete(id);
      setIsDeleteModalOpen(true);
    }, []);

    const filteredServices = useMemo(() => {
      if (search === "") return services;
      return services.filter(
        (service) =>
          service.id.toString().includes(search) ||
          service.service_price.toString().includes(search)
      );
    }, [services, search]);

    useEffect(() => {
      loadServices();
    }, [loadServices]);

    return (
      <>
        <div>
          <ServiceSearch
            addNewService={addNewService}
            setResearch={setSearch}
            customerCar={customerCar}
          />
          <Paper className="mt-3">
            <div className="flex flex-wrap justify-center p-2">
              {isLoading && <SkeletonCards />}
              {!isLoading &&
                filteredServices.map((serviceData) => (
                  <div key={serviceData.id} className="m-3">
                    <ServiceCard
                      serviceData={serviceData}
                      onDeleteClick={onDeleteClick}
                    />
                  </div>
                ))}
              {filteredServices.length === 0 && (
                <div className="flex p-5 w-full justify-center">
                  <Typography>
                    Opa! não existe serviço para esse veículo ainda. Clique em
                    "adicionar" para incluir um novo serviço
                  </Typography>
                </div>
              )}
            </div>
          </Paper>
        </div>
        <ConfirmDeleteModal
          handleClose={handleModalClose}
          isOpen={isDeleteModalOpen}
          onConfirmationClick={deleteService}
        />
      </>
    );
  };

const ServiceSearch = ({ addNewService, setResearch, customerCar }) => {
  return (
    <Paper
      variant="outlined"
      className="flex flex-col h-full w-full p-10 overflow-hidden"
    >
      <Typography variant="h5">
        Serviços do veículo{" "}
        {customerCar.license_plate &&
          customerCar.license_plate.replace(
            /^.{3}(?!-)/g,
            `${customerCar.license_plate.toUpperCase().slice(0, 3)}-`
          )}
      </Typography>
      <Divider variant="fullWidth" />
      <div className="mt-10">
        <SearchBar addAction={addNewService} setResearch={setResearch} />
      </div>
    </Paper>
  );
};

const SkeletonCards = () => (
  <>
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
    <Skeleton width={300} height={200} className="m-2" />
  </>
);

const ServiceCard = ({ serviceData, onDeleteClick }) => {
  const history = useHistory();
  return (
    <Card
      variant="outlined"
      className="flex flex-column p-3 cursor-pointer"
      onClick={() => history.push(`/services/${serviceData.id}`)}
    >
      <div
        style={{ height: "240px", width: "300px" }}
        className="flex flex-col p-2"
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Typography variant="body1">Valor mão de obra:</Typography>
            <Typography variant="h4" color="primary">
              {Number(serviceData.service_price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </div>
          <div className="flex justify-center items-center">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDeleteClick({ id: serviceData.id });
              }}
            >
              <Delete color="error" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography variant="body1">Quilometragem:</Typography>
          <Typography variant="h5" color="primary">
            {serviceData.odometer_reading || "Pendente"}
          </Typography>
        </div>
        <div className="flex flex-col mt-2">
          <Typography variant="body2">Data:</Typography>
          <Typography variant="body1">
            {moment(serviceData.created_at).format("DD/MM/YYYY")}
          </Typography>
        </div>
        <div className="flex mt-2 items-center">
          <Typography variant="body2">Id</Typography>
          <div className="ml-2">
            <Typography variant="body1">{serviceData.id}</Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default createCustomerCarServiceList({ engineAPI });
