import { createCustomerFormSubmit } from "./useCustomerFormSubmit";
import {
  AVAILABLE_FORMS,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
} from "context";

describe("createCustomerFormSubmit", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("submits customer data and updates combined forms", async () => {
    const api = {
      customers: {
        post: jest.fn().mockResolvedValue({ data: { id: 10 } }),
      },
    };
    const changeForm = jest.fn();
    const showNotification = jest.fn();

    const submit = createCustomerFormSubmit({
      api,
      changeForm,
      showNotification,
      loadedCustomer: null,
    });

    await submit({ fullname: "Maria" });

    expect(api.customers.post).toHaveBeenCalled();
    expect(changeForm).toHaveBeenCalledWith(AVAILABLE_FORMS.CUSTOMER, {
      id: 10,
    });
    expect(showNotification).toHaveBeenCalledWith({
      id: "customerAdded",
      duration: NOTIFICATION_DURATION.SHORT,
      title: "Cliente adicionado!",
      type: NOTIFICATION_TYPES.SUCCESS,
    });
  });

  it("shows error notification on failure", async () => {
    const api = {
      customers: {
        post: jest.fn().mockRejectedValue(new Error("fail")),
      },
    };
    const changeForm = jest.fn();
    const showNotification = jest.fn();

    const submit = createCustomerFormSubmit({
      api,
      changeForm,
      showNotification,
      loadedCustomer: null,
    });

    await submit({ fullname: "Maria" });

    expect(changeForm).not.toHaveBeenCalled();
    expect(showNotification).toHaveBeenCalledWith({
      id: "customerAddedError",
      duration: NOTIFICATION_DURATION.LONG,
      title: "Opa algo deu errado!",
      message:
        "Não foi possível adicionar o cliente. Revise os dados e tente novamente",
      type: NOTIFICATION_TYPES.ERROR,
    });
  });
});
