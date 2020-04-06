import React from "react"
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Divider,
  LinearProgress
} from "@material-ui/core";

import CarFormView from "../CarForm/CarFormView";
import CustomerCarFormView from "../CustomerCarForm/CustomerCarFormView";

import CustomerView from "../CustomerForm/CustomerFormView";

import useStyles from "../../hooks/FormStyleHook"
import PaperWithTitle from "../Common/PaperWithTitle";

const createWholeFormView = () =>
  function WholeFormView(props) {
    const { changeCarFormForKey, changeCustomerFormForKey, changeCustomerCarFormForKey, formsData, sendForm, isLoading } = props;
    const classes = useStyles()
    return (
      <>
        <PaperWithTitle title="Cadastrar Nova OS" paperClassNames={[classes.paperContainerTop]}>
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
                form={formsData.customerForm}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Divider variant="fullWidth" className={classes.divider} />
          </Grid>
          {formsData.modelsList.length === 0
            ? <LinearProgress />
            :
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
        </PaperWithTitle>
      </>
    )
  }

export default createWholeFormView()