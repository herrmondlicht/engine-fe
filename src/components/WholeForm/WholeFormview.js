import React from "react"
import {
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Divider
} from "@material-ui/core";

import CarFormView from "../CarForm/CarFormView";
import CustomerCarFormView from "../CustomerCarForm/CustomerCarFormView";

import CustomerView from "../CustomerForm/CustomerFormView";

import useStyles from "../../hooks/FormStyleHook"

const createWholeFormView = () =>
  function WholeFormView(props) {
    const { changeCarFormForKey, changeCustomerFormForKey, changeCustomerCarFormForKey, formsData, error, sendForm, isLoading } = props;
    const classes = useStyles()
    return (
      <>
        <Paper variant="outlined" className={`${classes.paperContainer} ${classes.paperContainerTop}`}>
          <Grid
            alignItems="center"
            container
            item
            sm={12}
            direction="column"
            className={classes.formWrapper}
          >
            <Grid
              container
              item
              sm={12}
              spacing={2}
              justify="center"
              direction="row"
            >
              <Grid item sm={12}>
                <Typography variant="h5" >Cadastrar Nova OS</Typography>
              </Grid>
              <FormDivider />
              <Grid item sm={3} className={classes.formItem}>
                <Typography variant="title">Dados do Cliente</Typography>
              </Grid>
              <Grid container item sm={9} spacing={2}>
                <CustomerView
                  changeFormForKey={changeCustomerFormForKey}
                  form={formsData.customerForm}
                />
              </Grid>
            </Grid>
            <FormDivider />
            {formsData.modelsList.length === 0
              ? "carregando..."
              :
              <>
                <Grid
                  container
                  item
                  sm={12}
                  spacing={2}
                  justify="center"
                  direction="row"
                  className={classes.formItem}
                >
                  <Grid item sm={3} className={classes.formItem}>
                    <Typography variant="title">Dados do Veículo</Typography>
                  </Grid>
                  <Grid container item sm={9} spacing={2}>
                    <CarFormView
                      modelsList={formsData.modelsList}
                      form={formsData.carForm}
                      changeFormForKey={changeCarFormForKey} />
                    <CustomerCarFormView
                      changeFormForKey={changeCustomerCarFormForKey}
                      form={formsData.customerCarForm}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  className={classes.formWrapper}
                >
                  {error && <span style={{ margin: 10, color: "red" }}>{error}</span>}
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="flex-end"
                  className={classes.formWrapper}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-testid="LoginForm_button"
                    disabled={isLoading}
                    onClick={sendForm}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Confirmar dados"}
                  </Button>
                </Grid>
              </>}
          </Grid>
        </Paper >
      </>
    )
  }

function FormDivider() {
  const classes = useStyles()
  return (
    <Grid container item xs={12} className={classes.formItem}>
      <Divider variant="fullWidth" className={classes.divider} />
    </Grid>
  )
}

export default createWholeFormView()