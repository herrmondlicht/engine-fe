import React from "react";
import { Paper, Grid, useTheme } from "@material-ui/core";
import AddCar from "./AddCar";
import AddCustomer from "./AddCustomer";

export default function() {
  const theme = useTheme();
  return (
    <Paper style={{ padding: theme.spacing(4) }}>
      <Grid container direction="row" spacing={4} justify="center">
        <Grid item xs={6}>
          <AddCar />
        </Grid>
        <Grid item xs={6}>
          <AddCustomer />
        </Grid>
      </Grid>
    </Paper>
  );
}
