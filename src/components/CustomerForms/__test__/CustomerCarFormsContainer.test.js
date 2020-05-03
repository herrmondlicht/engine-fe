import { render, fireEvent, wait } from "@testing-library/react";
import { createCustomerFormsContainer } from "../CustomerFormsContainer";
import { getErrorMessage } from "../../../utils/errorMessages";
import React from "react";
import { stub, assert as sinonAssert } from "sinon";

let engineAPI = {
  cars: {
    post: stub().resolves({ data: { data: {} } }),
    get: stub().resolves({ data: { data: [] } }),
  },
  customers: {
    post: stub().resolves({ data: { data: {} } }),
  },
};

const createTestComponent = (props) => {
  const Component = createCustomerFormsContainer({ engineAPI });
  return render(<Component {...props} />);
};

describe("CustomerCarForms", () => {
  afterEach(() => {
    engineAPI = {
      cars: {
        post: stub().resolves({ data: { data: {} } }),
        get: stub().resolves({ data: { data: [] } }),
      },
      customers: {
        post: stub().resolves({ data: { data: {} } }),
      },
    };
  });

  it("return of render", async () => {
    const { asFragment, getByTestId } = createTestComponent();
    await wait(() => getByTestId("CustomerFormsView_button"));
    expect(asFragment()).toMatchSnapshot();
  });

  it("return of render when the CarForm throws an error", async () => {
    const { getByTestId, queryByText } = createTestComponent();

    await wait(() => getByTestId("CustomerFormsView_button"));
    engineAPI.cars.post.rejects({});
    fireEvent.click(getByTestId("CustomerFormsView_button"));
    await wait(() => queryByText(getErrorMessage("CAR_FORM")));
  });

  it("return of render when the CustomerForm throws an error", async () => {
    engineAPI.customers.post.rejects({});
    const { getByTestId, queryByText } = createTestComponent();
    await wait(() => getByTestId("CustomerFormsView_button"));
    fireEvent.click(getByTestId("CustomerFormsView_button"));
    await wait(() => queryByText(getErrorMessage("CUSTOMER_FORM")));
  });

  it("return of render when the CustomerCarForm throws an error", async () => {
    engineAPI.customers.post.rejects({});
    const { getByTestId, queryByText } = createTestComponent();
    await wait(() => getByTestId("CustomerFormsView_button"));
    fireEvent.click(getByTestId("CustomerFormsView_button"));
    await wait(() => queryByText(getErrorMessage("CUSTOMER_CAR_FORM")));
  });

  it("call API to save the entire form", async () => {
    const expectedArgsCarStub = {
      data: { make: "", model: "", manufacture_year: "", fuel: "" },
    };
    const expectedArgsCustomerForm = {
      data: {
        document_number: "",
        fullname: "",
        address: "",
        email: "",
        phone: "",
      },
    };

    const expectedArgsCustomerCarForm = {
      urlExtension: "1/cars/",
      data: {
        license_plate: "",
        car_id: 1,
        displacement: "",
        color: "",
        customer_id: 1,
      },
    };

    engineAPI.cars.post.resolves({
      data: { data: { id: 1 } },
    });

    engineAPI.customers.post = engineAPI.customers.post.resolves({
      data: { data: { id: 1 } },
    });

    const { getByTestId } = createTestComponent();

    await wait(() => getByTestId("CustomerFormsView_button"));
    fireEvent.click(getByTestId("CustomerFormsView_button"));

    await wait(() => {
      sinonAssert.calledWith(engineAPI.cars.post, expectedArgsCarStub);
      sinonAssert.calledWith(
        engineAPI.customers.post.firstCall,
        expectedArgsCustomerForm
      );
      sinonAssert.calledWith(
        engineAPI.customers.post.secondCall,
        expectedArgsCustomerCarForm
      );
    });
  });
});
