import React from "react";
import CustomerFormsContainer from "../CustomerForms/CustomerFormsContainer";
import ServiceItemsContainer from "./ServiceItems/ServiceItemsContainer";
import PaperWithTitle from "../Common/PaperWithTitle";
import useStyles from "../../hooks/FormStyleHook";
import FinancialDetails from "./FinancialDetails/FinancialDetails";

export const createServiceFormContainer = () =>
  function ServiceFormContainer() {
    const classes = useStyles();
    return (
      <>
        <PaperWithTitle
          title="Cadastrar Nova OS"
          paperClassNames={classes.paperContainerTop}
        >
          <CustomerFormsContainer />
        </PaperWithTitle>
        <PaperWithTitle title="Itens do Serviço">
          <ServiceItemsContainer />
        </PaperWithTitle>
        <PaperWithTitle title="Pagamento">
          <FinancialDetails />
        </PaperWithTitle>
      </>
    );
  };

export default createServiceFormContainer();
