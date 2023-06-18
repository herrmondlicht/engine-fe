import React, { useEffect, useRef } from "react";
import { storageAPI, STORAGE_KEYS, engineAPI, yup } from "utils";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import EngineImage from "assets/engine_logo.png";
import { LoginForm } from "components";
import { Card } from "ui-fragments";
import { useCustomForm, useLoader, useNotification } from "hooks";

const loginFormSchema = yup.object().shape({
  password: yup.string().required(),
  username: yup.string().required(),
});

export const createLogin = (engineAPI, storageAPI) =>
  function Login() {
    const { showErrorNotification } = useNotification();
    const [isLoading, setIsLoading] = useLoader(false);
    const {
      formMethods: { handleSubmit, reset, register },
      validationMethods: { validate, errors },
    } = useCustomForm({ schema: loginFormSchema });
    const isMounted = useRef(true);
    const location = useLocation();
    const history = useHistory();
    const token = storageAPI.getItem(STORAGE_KEYS.TOKEN);
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(
      () => () => {
        isMounted.current = false;
      },
      []
    );

    async function sendForm(loginData) {
      if (!validate(loginData)) {
        return;
      }
      try {
        setIsLoading(true);
        const data = await engineAPI.login.post({ data: loginData });
        loginUser(data.token);
      } catch (e) {
        // TODO: implement proper error handling
        if (e?.response?.status === 401) {
          showErrorNotification({
            id: "authError",
            message: "Usuário ou senha incorretos",
          });
        } else {
          showErrorNotification({
            id: "loginError",
            message: "Não conseguimos acessar o sistema!",
          });
        }
      } finally {
        setIsLoading(false);
      }

      isMounted.current && setIsLoading(false);
    }

    function loginUser(token) {
      storageAPI.setItem(STORAGE_KEYS.TOKEN, token);
      reset();
      history.replace(from);
    }

    if (token) {
      return <Redirect to={{ pathname: from.pathname }} />;
    }

    return (
      <div
        data-testid="LoginPage"
        className="flex w-full h-full justify-center items-center relative"
      >
        <Card>
          <img src={EngineImage} alt="logo" className="w-80 mb-10" />
          <LoginForm
            registerInput={register}
            sendForm={handleSubmit(sendForm)}
            isLoading={isLoading}
            errors={errors}
          />
        </Card>
      </div>
    );
  };

export default createLogin(engineAPI, storageAPI);
