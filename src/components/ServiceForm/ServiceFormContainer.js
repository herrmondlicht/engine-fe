import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Snackbar } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

import CustomerFormsContainer from "../CustomerForms/CustomerFormsContainer";
import ServiceItemsContainer from "./ServiceItems/ServiceItemsContainer";
import PaperWithTitle from "../Common/PaperWithTitle";
import useStyles from "../../hooks/FormStyleHook";
import FinancialDetails from "./FinancialDetails/FinancialDetails";
import { engineAPI } from "utils";

export const createServiceFormContainer = ({ engineAPI }) =>
  function ServiceFormContainer() {
    const { service_id: serviceId } = useParams();
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
      if (serviceId) {
        try {
          const {
            data: { data },
          } = await engineAPI.service_orders.get({
            urlExtension: serviceId,
          });
          setServiceData(data);
          setCustomerSubFormsIds({ customerCarFormId: data.customer_car_id });
        } catch (e) {
          setSnackError(true);
        }
      }
    }, [serviceId]);

    const commitUpdateValuesToBackend = useCallback(
      ({ service_price, discount_price }) => {
        engineAPI.service_orders.patch({
          urlExtension: serviceId,
          data: {
            service_price,
            discount_price,
          },
        });
      },
      [serviceId]
    );

    const commitKeyValueToBackend = useCallback(
      ({ key, value }) => {
        engineAPI.service_orders.patch({
          urlExtension: serviceId,
          data: { [key]: value },
        });
      },
      [serviceId]
    );

    const commitObservationToBackend = useCallback(
      (observations) => {
        engineAPI.service_orders.patch({
          urlExtension: serviceId,
          data: { observations },
        });
      },
      [serviceId]
    );

    const updateValuesToState = useCallback(
      (key) => (value) => {
        setServiceData((prevServiceData) => ({
          ...prevServiceData,
          [key]: value,
        }));
      },
      []
    );

    const updateTotalItemsPrice = useCallback(
      (totalPrice) =>
        setServiceData((prevServiceData) => ({
          ...prevServiceData,
          service_items_price: totalPrice,
        })),
      []
    );
    useEffect(() => {
      getSeviceById();
    }, [getSeviceById]);

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
          <ServiceItemsContainer
            serviceOrderId={serviceData?.id}
            updateTotalItemsPrice={updateTotalItemsPrice}
          />
        </PaperWithTitle>
        <PaperWithTitle title="Pagamento & Mais detalhes">
          <FinancialDetails
            {...serviceData}
            updateServiceValuesOnChange={updateValuesToState}
            updateServicesValuesOnBlur={commitUpdateValuesToBackend}
            updateObservationOnBlur={commitObservationToBackend}
            updateValueOnBlur={commitKeyValueToBackend}
          />
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
