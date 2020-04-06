import WholeFormContainer from "../components/CustomerForms/WholeForm/WholeFormContainer";

const routes = {
  addnewcar: {
    name: "Add new car",
    path: "addnewcar",
    Component: WholeFormContainer,
    isLocked: true,
    exact: true
  },
  home: {
    name: "Add new car",
    path: "/",
    Component: WholeFormContainer,
    isLocked: true,
    exact: true
  }
};

export default routes;
