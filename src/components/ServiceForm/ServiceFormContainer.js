import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Snackbar } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

import CustomerFormsContainer from "../CustomerForms/CustomerFormsContainer";
import ServiceItemsContainer from "./ServiceItems/ServiceItemsContainer";
import PaperWithTitle from "../Common/PaperWithTitle";
import useStyles from "../../hooks/FormStyleHook";
import FinancialDetails from "./FinancialDetails/FinancialDetails";
import engineAPI from "../../utils/engineAPI/engineAPI";

export const createServiceFormContainer = ({ engineAPI }) =>
  function ServiceFormContainer() {
    const { customer_car: customerCar, service_id: serviceId } = useParams();
    const classes = useStyles();
    const [customerSubFormsIds, setCustomerSubFormsIds] = useState({});
    const [serviceData, setServiceData] = useState({});
    const [snackError, setSnackError] = useState(false);

    const setIdForCustomerSubForm = (idChangeObject) =>
      setCustomerSubFormsIds((prev) => ({
        ...prev,
        ...idChangeObject,
      }));

    const getSeviceById = useCallback(async () => {
      try {
        const {
          data: { data },
        } = await engineAPI.service_orders.get({
          urlExtension: serviceId,
        });
        setServiceData(data);
      } catch (e) {
        setSnackError(true);
      }
    }, [serviceId]);

    useEffect(() => {
      if (customerCar) {
        setIdForCustomerSubForm({ customerCarFormId: customerCar });
        getSeviceById();
      }
    }, [customerCar, getSeviceById]);


    return (
      <>
        <PaperWithTitle
          title="Cadastrar Nova OS"
          paperClassNames={[classes.paperContainerTop]}
        >
          <CustomerFormsContainer
            customerSubFormsIds={customerSubFormsIds}
            setIdForCustomerSubForm={setIdForCustomerSubForm}
          />
        </PaperWithTitle>
        <PaperWithTitle title="Itens do Serviço">
          <ServiceItemsContainer serviceOrderId={serviceData.id} />
        </PaperWithTitle>
        <PaperWithTitle title="Pagamento">
          <FinancialDetails />
        </PaperWithTitle>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={snackError}
        >
          <MuiAlert onClose={() => setSnackError(false)} severity="error">
            Não foi possível encontrar a ordem de serviço
          </MuiAlert>
        </Snackbar>
      </>
    );
  };

export default createServiceFormContainer({ engineAPI });
