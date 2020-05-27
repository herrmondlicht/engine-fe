import React from "react";
//temporary /\/\/\/\/\/\
import ServiceFormContainer from "../components/ServiceForm/ServiceFormContainer";
import CustomerFormsContainerWithPaper from "../components/CustomerForms/CustomerFormsContainerWithPaper";
import CustomerCarList from "../components/CustomerCarList/CustomerCarList";

const routes = {
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
  customerServices: {
    name: "Customer Services",
    path: "customers/:id/services",
    Component: () => <div>TODO: Customer Services</div>,
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

export default routes;
