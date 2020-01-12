import React, { useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import EngineImage from "./engine_logo.png";
import apiRoutes from "../../utils/apiRoutes/apiRoutes";
import storageAPI, { STORAGE_KEYS } from "../../utils/storage/storageAPI";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    position: "absolute"
  },
  loginContainer: {
    width: 350,
    padding: theme.spacing(3),
    boxSizing: "border-box"
  },
  engineImage: {
    width: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box"
  }
}));

const formErrors = () => ({
  401: "Email ou senha incorretos"
});

const getErrorMessage = code => {
  const errorCodes = formErrors();
  const errorMessage = errorCodes[code] || "Não foi possível acessar o sistema";
  return errorMessage;
};

export const createLogin = (apiRoutes, storageAPI, useLocation, useHistory) =>
  function Login() {
    const classes = useStyles();
    const [userInput, changeInput] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const token = storageAPI.get(STORAGE_KEYS.TOKEN);
    const { from } = location.state || { from: { pathname: "/" } };

    async function sendForm() {
      try {
        const response = await apiRoutes.login.post({ data: userInput });
        loginUser(response.data.token);
      } catch (e) {
        setErrorMessage(getErrorMessage(e.response.status));
      }
    }

    function loginUser(token) {
      storageAPI.set(STORAGE_KEYS.TOKEN, token);
      history.replace(from);
    }

    if (token) {
      return <Redirect to={{ pathname: from.pathname }} />;
    }
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Paper className={classes.loginContainer}>
          <img
            src={EngineImage}
            alt="logo"
            className={classes.engineImage}
          ></img>
          <LoginForm
            data-test-id="LoginForm"
            errorMessage={errorMessage}
            changeInput={changeInput}
            userInput={userInput}
            sendForm={sendForm}
          />
        </Paper>
      </Grid>
    );
  };

export default createLogin(apiRoutes, storageAPI, useLocation, useHistory);
