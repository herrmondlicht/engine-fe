import React, { useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import EngineImage from "./engine_logo.png";
import engineAPI from "../../utils/engineAPI/engineAPI";
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

export const createLogin = (engineAPI, storageAPI) =>
  function Login() {
    const classes = useStyles();
    const [userInput, changeInput] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const history = useHistory();
    const token = storageAPI.getItem(STORAGE_KEYS.TOKEN);
    const { from } = location.state || { from: { pathname: "/customers" } };

    async function sendForm() {
      try {
        setIsLoading(true)
        const response = await engineAPI.login.post({ data: userInput });
        loginUser(response.data.token);
      } catch (e) {
        setErrorMessage(getErrorMessage(e?.response?.status));
      }

      setIsLoading(false)
    }

    function loginUser(token) {
      storageAPI.setItem(STORAGE_KEYS.TOKEN, token);
      changeInput({ username: "", password: "" });
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
            errorMessage={errorMessage}
            changeInput={changeInput}
            userInput={userInput}
            sendForm={sendForm}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
    );
  };

export default createLogin(engineAPI, storageAPI);
