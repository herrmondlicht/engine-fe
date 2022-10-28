import React from "react";
import { stub, assert } from "sinon";
import { createMemoryHistory } from "history";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { createLogin } from "./LoginPage";
import { STORAGE_KEYS } from "utils";

describe("Login Page", () => {
  it("should render", () => {
    const engineAPIStub = { login: { post: stub() } };
    const LoginPage = createLogin(engineAPIStub, {
      getItem: stub(),
      setItem: stub(),
    });

    render(<LoginPage />, { wrapper: BrowserRouter });

    expect(screen.getByTestId("LoginPage")).toMatchSnapshot();
  });

  it("should display error when username is empty and user clicks login", async () => {
    const engineAPIStub = { login: { post: stub() } };
    const LoginPage = createLogin(engineAPIStub, {
      getItem: stub(),
      setItem: stub(),
    });

    render(<LoginPage />, { wrapper: BrowserRouter });

    screen.getByText("Entrar").click();
    await waitFor(() => {
      const inputUser = screen.getByLabelText("Usuário");
      within(inputUser.parentElement).getByText("Campo obrigatório");
    });
  });

  it("should display error when password is empty and user clicks login", async () => {
    const engineAPIStub = { login: { post: stub() } };
    const LoginPage = createLogin(engineAPIStub, {
      getItem: stub(),
      setItem: stub(),
    });

    render(<LoginPage />, { wrapper: BrowserRouter });
    const inputUser = screen.getByLabelText("Usuário");
    const inputPassword = screen.getByLabelText("Senha");

    fireEvent.change(inputUser, { target: { value: "admin" } });
    screen.getByText("Entrar").click();

    within(inputPassword.parentElement).findByText("Campo obrigatório");
  });

  it("should call api post method with correct data when login button is clicked", async () => {
    const history = createMemoryHistory();
    const engineAPIStub = {
      login: { post: stub().resolves({ token: "abce" }) },
    };
    const sessionStorageStub = {
      getItem: stub(),
      setItem: stub(),
    };
    const LoginPage = createLogin(engineAPIStub, sessionStorageStub);
    const EXPECTED_CALL_ARG = {
      data: {
        username: "admin",
        password: "password",
      },
    };

    render(
      <Router history={history}>
        <Route
          path="/customers"
          exact
          component={() => <div>Loaded correct screen</div>}
        />
        <LoginPage />
      </Router>
    );
    const inputUser = screen.getByLabelText("Usuário");
    const inputPassword = screen.getByLabelText("Senha");

    fireEvent.change(inputUser, { target: { value: "admin" } });
    fireEvent.change(inputPassword, { target: { value: "password" } });
    screen.getByText("Entrar").click();

    await waitFor(() => {
      assert.calledWithExactly(engineAPIStub.login.post, EXPECTED_CALL_ARG);
      assert.calledWithExactly(
        sessionStorageStub.setItem,
        STORAGE_KEYS.TOKEN,
        "abce"
      );
    });

    expect(screen.getByText("Loaded correct screen"));
  });
});
