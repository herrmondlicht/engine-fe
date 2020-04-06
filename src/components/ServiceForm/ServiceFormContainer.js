import React from "react";
import CustomerFormsContainer from "../CustomerForms/CustomerFormsContainer";
import ServiceItems from "./ServiceItems/ServiceItems";

export const createServiceFormContainer = () =>
  function ServiceFormContainer() {
    return (
      <>
        <CustomerFormsContainer />
        <ServiceItems />
      </>
    );
  };

export default createServiceFormContainer();
