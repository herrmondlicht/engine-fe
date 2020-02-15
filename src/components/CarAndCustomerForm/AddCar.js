import React from "react";
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  TextField
} from "@material-ui/core";

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
