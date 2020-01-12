import { render, getByTestId } from "@testing-library/react";
import { createLogin } from "../Login";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { stub } from "sinon";
import { STORAGE_KEYS } from "../../../utils/storage/storageAPI";

let apiRoutes = { login: { post: stub() } };
let storageAPI = { get: stub(), set: stub() };
let useLocation = stub().returns({});
let useHistory = stub().returns({ replace: stub() });

const createComponent = () =>
  createLogin(apiRoutes, storageAPI, useLocation, useHistory);

describe("Login", () => {
  afterEach(() => {
    apiRoutes = { login: { post: stub() } };
    storageAPI = { get: stub(), set: stub() };
    useLocation = stub().returns({});
    useHistory = stub().returns({ replace: stub() });
  });

  it("should render", () => {
    const Component = createComponent();
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("return of render when token has already been provided", () => {
    const Component = createComponent();
    storageAPI.get.withArgs(STORAGE_KEYS.TOKEN).returns("nonemptyValue");
    const { asFragment } = render(<Component />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
