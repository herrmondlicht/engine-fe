import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    position: "absolute",
    background: "rgba(0,0,0,0)"
  },
  field: {
    width: "100%"
  },
  loginButton: {
    marginTop: theme.spacing(2)
  },
  errorMessage: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.error.main
  }
}));

function LoginForm({ userInput, changeInput, sendForm, errorMessage }) {
  const classes = useStyles();

  function onFormSubmit(e) {
    e.preventDefault();
    sendForm();
  }

  return (
    <form onSubmit={onFormSubmit} data-testid="LoginForm">
      <Grid
        container
        item
        direction="column"
        spacing={2}
        alignItems="stretch"
        justify="center"
      >
        <Grid item>
          <TextField
            label="E-mail"
            className={classes.field}
            size="small"
            variant="outlined"
            onChange={e =>
              changeInput({ ...userInput, username: e.target.value })
            }
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Senha"
            type="password"
            className={classes.field}
            size="small"
            variant="outlined"
            onChange={e =>
              changeInput({ ...userInput, password: e.target.value })
            }
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            className={`${classes.loginButton} ${classes.field}`}
            variant="contained"
            color="primary"
            type="submit"
          >
            Entrar
          </Button>
        </Grid>
        {errorMessage && (
          <Grid item container>
            <span className={`${classes.errorMessage}`}>{errorMessage}</span>
          </Grid>
        )}
      </Grid>
    </form>
  );
}

export default LoginForm;
