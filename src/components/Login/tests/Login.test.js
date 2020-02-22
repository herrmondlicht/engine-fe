import { render, fireEvent, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createLogin } from "../Login";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { stub, assert, match } from "sinon";
import { STORAGE_KEYS } from "../../../utils/storage/storageAPI";

let apiRoutes = { login: { post: stub() } };
let storageAPI = { getItem: stub(), setItem: stub() };

const createTestComponent = props => {
  const Component = createLogin(apiRoutes, storageAPI);
  return render(<Component {...props} />, { wrapper: MemoryRouter });
};

describe("Login", () => {
  afterEach(() => {
    apiRoutes = { login: { post: stub() } };
    storageAPI = { getItem: stub(), setItem: stub() };
  });

  it("return of render", () => {
    const { asFragment } = createTestComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("return of render when token has already been provided", () => {
    storageAPI.getItem.withArgs(STORAGE_KEYS.TOKEN).returns("nonemptyValue");
    const { asFragment } = createTestComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("log the user in", async () => {
    const token = "tokenreturned";
    const username = "foolano";
    const password = "psw311";

    apiRoutes.login.post.resolves({ data: { token } });

    const { getByTestId, debug } = createTestComponent();

    userEvent.type(
      getByTestId("LoginFormContainer_Email").querySelector("input"),
      username
    );
    userEvent.type(
      getByTestId("LoginFormContainer_Password").querySelector("input"),
      password
    );
    fireEvent.click(getByTestId("LoginForm_button"));
    await wait(() => {
      assert.calledWith(
        apiRoutes.login.post,
        match({ data: { password, username } })
      );

      assert.calledWith(storageAPI.setItem, STORAGE_KEYS.TOKEN, token);
    });
  });
});
