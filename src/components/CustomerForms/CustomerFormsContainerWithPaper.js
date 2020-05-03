import React from "react";
import PaperWithTitle from "../Common/PaperWithTitle";
import CustomerFormsContainer from "./CustomerFormsContainer";
import useStyles from "../../hooks/FormStyleHook";
import { useHistory } from "react-router-dom";

export const createCustomerFormsContainerWithPaper = () =>
  function CustomerFormsContainerWithPaper(props) {
    const history = useHistory();
    const classes = useStyles();

    const afterSendAction = (customerCarId) => {
      history.push(`/services/${customerCarId}/new`);
    };

    return (
      <PaperWithTitle
        title="Cadastrar Novo Cliente"
        paperClassNames={[classes.paperContainerTop]}
      >
        <CustomerFormsContainer afterSendAction={afterSendAction} {...props} />
      </PaperWithTitle>
    );
  };

export default createCustomerFormsContainerWithPaper();
