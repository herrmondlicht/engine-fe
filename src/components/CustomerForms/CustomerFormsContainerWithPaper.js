import React from "react";
import { useHistory } from "react-router-dom";

import { engineAPI } from "utils";
import PaperWithTitle from "../Common/PaperWithTitle";
import CustomerFormsContainer from "./CustomerFormsContainer";
import useStyles from "../../hooks/FormStyleHook";

export const createCustomerFormsContainerWithPaper = ({ engineAPI } = {}) =>
  function CustomerFormsContainerWithPaper(props) {
    const history = useHistory();
    const classes = useStyles();

    const afterSendAction = async (customerCarId) => {
      const { data } = await engineAPI.customer_cars.post({
        urlExtension: `${customerCarId}/services`,
        data: {
          customer_car_id: customerCarId,
          service_items_price: 0,
          service_price: 0,
        },
      });
      history.push(`/services/${data.id}`);
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

export default createCustomerFormsContainerWithPaper({ engineAPI });
