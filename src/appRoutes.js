import {
  RegisterForm,
  ServicePage,
  CustomerPage,
  CustomerListPage,
} from "pages";

export const appRoutes = {
  newClient: {
    name: "Novo Cliente",
    path: "customer_car/:customer_car_id?",
    Component: RegisterForm,
    isLocked: true,
  },
  service: {
    name: "Serviço",
    path: "services/:serviceId",
    Component: ServicePage,
    isLocked: true,
    allowGoBack: true,
  },
  allCustomers: {
    name: "Clientes",
    path: "customers",
    Component: CustomerListPage,
    exact: true,
    isLocked: true,
  },
  clientServices: {
    name: "Cliente",
    path: "customers/:customer_car_id",
    Component: CustomerPage,
    isLocked: true,
    allowGoBack: true,
  },
};
