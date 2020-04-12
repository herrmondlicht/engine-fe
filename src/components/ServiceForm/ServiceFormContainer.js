import React, { useState } from "react";
import CustomerFormsContainer from "../CustomerForms/CustomerFormsContainer";
import ServiceItemsContainer from "./ServiceItems/ServiceItemsContainer";
import PaperWithTitle from "../Common/PaperWithTitle";
import useStyles from "../../hooks/FormStyleHook";
import FinancialDetails from "./FinancialDetails/FinancialDetails";

export const createServiceFormContainer = () =>
  function ServiceFormContainer() {
    const classes = useStyles();
    const [customerSubFormsIds, setCustomerSubFormsIds] = useState({});
    const [serviceOrderId, setServiceOrderId] = useState({});

    const setIdForCustomerSubForm = (idChangeObject) =>
      setCustomerSubFormsIds((prev) => ({
        ...prev,
        ...idChangeObject,
      }));

    return (
      <>
        <PaperWithTitle
          title="Cadastrar Nova OS"
          paperClassNames={classes.paperContainerTop}
        >
          <CustomerFormsContainer
            customerSubFormsIds={customerSubFormsIds}
            setIdForCustomerSubForm={setIdForCustomerSubForm}
          />
        </PaperWithTitle>
        <PaperWithTitle title="Itens do Serviço">
          <ServiceItemsContainer
            serviceOrderId={serviceOrderId}
            setServiceOrderId={setServiceOrderId}
          />
        </PaperWithTitle>
        <PaperWithTitle title="Pagamento">
          <FinancialDetails />
        </PaperWithTitle>
      </>
    );
  };

export default createServiceFormContainer();
