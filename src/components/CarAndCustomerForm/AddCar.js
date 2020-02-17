import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  TextField
} from "@material-ui/core";

import requests from "../../utils/apiRoutes/apiRoutes";

import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    padding: theme.spacing(2)
  },
  formItem: {
    marginTop: theme.spacing(2)
  }
}));

export default () => {
  const classes = useStyles();
  const [carList, changeList] = useState([]);

  async function fetchData(){
    const carList = await requests.cars.get()
    changeList(carList.data.data);
  }

  useEffect(() => {
    fetchData();
  })

  if(carList.length === 0){
    return "loading...";
  }

  return (
    <Paper variant="outlined">
      <Grid container alignContent="center">
        <Grid
          container
          item
          sm={12}
          justify="center"
          className={classes.formWrapper}
        >
          <Typography variant="h4">Adicionar novo veículo</Typography>
        </Grid>
        <Grid
          container
          item
          sm={12}
          direction="column"
          className={classes.formWrapper}
        >
          {/* form */}
          <Grid item className={classes.formItem}>
            <Autocomplete
              id="car-make"
              options={carList}
              getOptionLabel={option => option.make}
              renderInput={params => (
                <TextField {...params} size="small" label="Combo box" variant="outlined" fullWidth />
              )}
            />
          </Grid>
          <Grid item className={classes.formItem}>
            <Autocomplete
              id="car-model"
              options={carList}
              getOptionLabel={option => option.model}
              renderInput={params => (
                <TextField {...params} size="small" label="Combo box" variant="outlined" fullWidth />
              )}
            />
          </Grid>
          <Grid item className={classes.formItem}>
            <TextField
              label="E-mail"
              data-testid="LoginFormContainer_Email"
              fullWidth
              size="small"
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item className={classes.formItem}>
            <TextField
              label="E-mail"
              data-testid="LoginFormContainer_Email"
              fullWidth
              size="small"
              variant="outlined"
            ></TextField>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
