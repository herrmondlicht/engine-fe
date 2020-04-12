import React from "react";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  Box,
  Icon,
} from "@material-ui/core";

import CarFormView from "./CarForm/CarFormView";
import CustomerCarFormView from "./CustomerCarForm/CustomerCarFormView";
import CustomerView from "./CustomerForm/CustomerFormView";

import useStyles from "../../hooks/FormStyleHook";
import { getErrorMessage } from "../../utils/errorMessages";

const createWholeFormView = () =>
  function WholeFormView(props) {
    const {
      changeCarFormForKey,
      changeCustomerFormForKey,
      changeCustomerCarFormForKey,
      modelsList,
      customerForm,
      customerCarForm,
      carForm,
      sendForm,
      isLoading,
      isFormFilled,
      errorType,
    } = props;
    const classes = useStyles();
    return (
      <>
        <Grid
          container
          item
          sm={12}
          spacing={2}
          justify="center"
          direction="row"
        >
          <Grid item sm={3}>
            <Typography>Dados do Cliente</Typography>
          </Grid>
          <Grid container item sm={9} spacing={2}>
            <CustomerView
              changeFormForKey={changeCustomerFormForKey}
              form={customerForm}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Divider variant="fullWidth" className={classes.divider} />
        </Grid>
        {!modelsList ? (
          <LinearProgress />
        ) : (
          <>
            <Grid
              container
              item
              sm={12}
              spacing={2}
              justify="center"
              direction="row"
            >
              <Grid item sm={3}>
                <Typography>Dados do Veículo</Typography>
              </Grid>
              <Grid container item sm={9} spacing={2}>
                <CarFormView
                  modelsList={modelsList}
                  form={carForm}
                  changeFormForKey={changeCarFormForKey}
                />
                <CustomerCarFormView
                  changeFormForKey={changeCustomerCarFormForKey}
                  form={customerCarForm}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              alignItems="flex-end"
              direction="column"
              className={classes.formWrapper}
            >
              <FormErrorMessage errorType={errorType} />
              <Box width={250} mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  onClick={sendForm}
                  fullWidth
                  data-testid="CustomerFormsView_button"
                >
                  {isLoading && <FormLoadingButtonText />}
                  {isFormFilled && <FormFilledButtonText />}
                  {!isLoading && !isFormFilled && "Confirmar Dados"}
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </>
    );
  };

function FormFilledButtonText() {
  return (
    <>
      <Icon size={24}>done</Icon>
      <Box ml={1}>Reenviar Dados</Box>
    </>
  );
}
function FormLoadingButtonText() {
  return (
    <>
      <CircularProgress size={24} />
      <Box ml={1}>Confirmando Dados</Box>
    </>
  );
}

function FormErrorMessage({ errorType }) {
  const classes = useStyles();
  return (
    <span
      className={classes.formErrorMessage}
      data-testid="FormErrorMessage_span"
    >
      {getErrorMessage(errorType)}
    </span>
  );
}

export default createWholeFormView();
