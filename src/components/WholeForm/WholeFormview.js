import React from "react"
import {
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress
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
            alignContent="center"
            justify="center"
            container
            item
            sm={12}
            direction="column"
            className={classes.formWrapper}
          >
            <Typography align="center" variant="h4">Dados do Cliente</Typography>
            <Grid
              container
              item
              sm={12}
              spacing={2}
              justify="center"
              direction="row"
            >
              <CustomerView
                changeFormForKey={changeCustomerFormForKey}
                form={formsData.customerForm}
              />
            </Grid>
          </Grid>
        </Paper >
        <Paper variant="outlined" className={classes.paperContainer}>
          {formsData.modelsList.length === 0
            ? "carregando..."
            :
            <Grid
              alignItems="center"
              justify="center"
              container
              item
              sm={12}
              direction="column"
              className={classes.formWrapper}
            >
              <Typography variant="h4">Dados do veículo</Typography>
              <Grid
                container
                item
                sm={12}
                spacing={2}
                justify="center"
                direction="row"
              >
                <Grid item sm={6} xs={12}>
                  <CarFormView
                    modelsList={formsData.modelsList}
                    form={formsData.carForm}
                    changeFormForKey={changeCarFormForKey} />
                </Grid>
                <Grid item sm={6} xs={12}>
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
            </Grid>}
        </Paper >
      </>
    )
  }



export default createWholeFormView()