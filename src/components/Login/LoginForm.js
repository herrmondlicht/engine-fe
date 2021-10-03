import React from "react";
import { Input, Button } from "ui-fragments";

function LoginForm({ registerInput, sendForm, errors, isLoading }) {
  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={sendForm}
      data-testid="LoginFormContainer"
    >
      <div className="w-full">
        <Input
          fw
          label="Usuário"
          {...registerInput("username")}
          error={errors.username}
        />
      </div>
      <div className="w-full">
        <Input
          fw
          type="password"
          label="Senha"
          {...registerInput("password")}
          error={errors.password}
        />
      </div>
      <div className="mt-4">
        <Button fw disabled={isLoading} showLoader={isLoading}>
          Entrar
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
