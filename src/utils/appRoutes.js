import React from "react";
//temporary /\/\/\/\/\/\
import {
  ServiceFormContainer,
  CustomerFormsContainerWithPaper,
  CustomerCarList,
  CustomerCarServiceList,
} from "components";

export const appRoutes = {
  customers: {
    name: "Clientes",
    path: "customers",
    Component: CustomerCarList,
    isLocked: true,
    exact: true,
  },
  newCustomer: {
    name: "Novo Cliente",
    path: "customers/new",
    Component: CustomerFormsContainerWithPaper,
    isLocked: true,
    exact: true,
  },
  customer: {
    name: "Cliente",
    path: "customers/:id",
    Component: () => <div>TODO: Customer</div>,
    isLocked: true,
    exact: true,
  },
  customerCar: {
    name: "Customer Cars",
    path: "customers/:id/cars/:customer_car_id",
    Component: CustomerCarServiceList,
    isLocked: true,
    exact: true,
  },
  newService: {
    name: "Serviço",
    path: "services/:service_id",
    Component: ServiceFormContainer,
    isLocked: true,
    exact: true,
  },
};
