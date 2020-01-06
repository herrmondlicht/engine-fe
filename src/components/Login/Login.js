import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Grid, makeStyles, Paper } from "@material-ui/core";
import EngineImage from "./engine_original.PNG";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    position: "absolute",
    background:
      "linear-gradient(22deg, rgba(131,58,180,1) 0%, rgba(252,176,69,1) 100%)"
    // background: "#E5E5E5"
  },
  loginContainer: {
    width: 350,
    padding: theme.spacing(3),
    boxSizing: "border-box"
  },
  field: {
    width: "100%"
  },
  engineImage: {
    width: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box"
  },
  loginButton: {
    marginTop: theme.spacing(2)
  }
}));

function Login() {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.loginContainer}>
        <img src={EngineImage} className={classes.engineImage}></img>
        <LoginForm />
      </Paper>
    </Grid>
  );
}

function LoginForm() {
  const classes = useStyles();
  return (
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
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          label="Senha"
          type="password"
          className={classes.field}
          size="small"
          variant="outlined"
        ></TextField>
      </Grid>
      <Grid item>
        <Button
          className={`${classes.loginButton} ${classes.field}`}
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
