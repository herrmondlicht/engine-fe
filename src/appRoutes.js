import { RegisterForm, ServicePage } from "pages";

export const appRoutes = {
  testForm: {
    name: "Mais Novo Cliente",
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
};
