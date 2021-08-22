import {
  ServiceFormContainer,
  CustomerCarServiceList,
  CustomerFormsContainerWithPaper,
} from "components";
import { RegisterForm } from "pages";

export const appRoutes = {
  customers: {
    name: "Clientes",
    path: "customers",
    Component: CustomerFormsContainerWithPaper,
    isLocked: true,
  },
  newCustomer: {
    name: "Novo Cliente",
    path: "customers/new",
    Component: CustomerFormsContainerWithPaper,
    isLocked: true,
  },
  testForm: {
    name: "Mais Novo Cliente",
    path: "customer_car/:customer_car_id?",
    Component: RegisterForm,
    isLocked: true,
  },
  customerCar: {
    name: "Customer Cars",
    path: "customers/:id/cars/:customer_car_id",
    Component: CustomerCarServiceList,
    isLocked: true,
  },
  newService: {
    name: "Serviço",
    path: "services/:service_id",
    Component: ServiceFormContainer,
    isLocked: true,
  },
};
