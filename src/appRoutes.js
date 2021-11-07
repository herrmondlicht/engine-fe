import { CustomerCarList } from "components";
import { RegisterForm, ServicePage, ClientPage } from "pages";

export const appRoutes = {
  newClient: {
    name: "Novo Cliente",
    path: "customer_car/:customer_car_id?",
    Component: RegisterForm,
    isLocked: true,
  },
  newService: {
    name: "Serviço",
    path: "services/:serviceId",
    Component: ServicePage,
    isLocked: true,
  },
  allCustomers: {
    name: "Clientes",
    path: "customers",
    Component: CustomerCarList,
    exact: true,
    isLocked: true,
  },
  clientServices: {
    name: "Cliente",
    path: "customers/:customer_car_id",
    Component: ClientPage,
    isLocked: true,
  },
};
