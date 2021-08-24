import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  loginButton: {
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.error.main,
  },
}));

function LoginForm({
  userInput,
  changeInput,
  sendForm,
  errorMessage,
  isLoading,
}) {
  const classes = useStyles();

  function onFormSubmit(e) {
    e.preventDefault();
    sendForm();
  }

  return (
    <form onSubmit={onFormSubmit} data-testid="LoginFormContainer">
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
            data-testid="LoginFormContainer_Email"
            fullWidth
            size="small"
            variant="outlined"
            value={userInput.username}
            onChange={e =>
              changeInput({ ...userInput, username: e.target.value })
            }
          />
        </Grid>
        <Grid item>
          <TextField
            label="Senha"
            data-testid="LoginFormContainer_Password"
            type="password"
            fullWidth
            size="small"
            value={userInput.password}
            variant="outlined"
            onChange={e =>
              changeInput({ ...userInput, password: e.target.value })
            }
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            data-testid="LoginForm_button"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Entrar"}
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
