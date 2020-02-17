import AddNewCar from "../components/CarAndCustomerForm/AddCarAndCustomer";

const routes = {
  addnewcar: {
    name: "Add new car",
    path: "addnewcar",
    Component: AddNewCar,
    isLocked: true,
    exact: true
  },
  home: {
    name: "Add new car",
    path: "/",
    Component: AddNewCar,
    isLocked: true,
    exact: true
  }
};

export default routes;
