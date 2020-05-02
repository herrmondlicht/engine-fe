import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CustomerFormsContainer from "../CustomerForms/CustomerFormsContainer";
import ServiceItemsContainer from "./ServiceItems/ServiceItemsContainer";
import PaperWithTitle from "../Common/PaperWithTitle";
import useStyles from "../../hooks/FormStyleHook";
import FinancialDetails from "./FinancialDetails/FinancialDetails";
import engineAPI from "../../utils/engineAPI/engineAPI";

export const createServiceFormContainer = ({ engineAPI }) =>
  function ServiceFormContainer() {
    const { customer_car: customerCar } = useParams();
    const classes = useStyles();
    const [customerSubFormsIds, setCustomerSubFormsIds] = useState({});
    const [serviceOrderId, setServiceOrderId] = useState({});

    const setIdForCustomerSubForm = (idChangeObject) =>
      setCustomerSubFormsIds((prev) => ({
        ...prev,
        ...idChangeObject,
      }));

    useEffect(() => {
      if (customerCar) {
        setIdForCustomerSubForm({ customerCarFormId: customerCar });
      }
    }, [customerCar]);

    return (
      <>
        <PaperWithTitle
          title="Cadastrar Nova OS"
          paperClassNames={[classes.paperContainerTop]}
        >
          <CustomerFormsContainer
            hideSendButton={true}
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

export default createServiceFormContainer({ engineAPI });
