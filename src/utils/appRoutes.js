import ServiceFormContainer from "../components/ServiceForm/ServiceFormContainer";

const routes = {
  newService: {
    name: "New Service",
    path: "new-service",
    Component: ServiceFormContainer,
    isLocked: true,
    exact: true,
  }
};

export default routes;
