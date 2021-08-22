import React from "react";

import { AVAILABLE_FORMS } from "context";
import { useCombinedForms } from "hooks";

import { Input, Card } from "ui-fragments";
import {
  convertFormKeyToAPI, engineAPI, fixPayloadKeys, yup,
} from "utils";
import { FormWithButton } from "./FormWithButton";

const schema = yup.object().shape({
  documentNumber: yup.string(),
  address: yup.string(),
  email: yup.string(),
  fullname: yup.string().required(),
  phone: yup.string(),
});

const getHTTPMethod = (data) => (data ? "patch" : "post");

const CustomerForm = ({ loadedCustomer }) => {
  const { changeForm } = useCombinedForms();
  const sendForm = async (data) => {
    const method = getHTTPMethod(loadedCustomer?.id);
    try {
      const { data: customerData } = await engineAPI.customers[method]({
        urlExtension: loadedCustomer?.id,
        data: fixPayloadKeys(data, { fieldTranslator: convertFormKeyToAPI }),
      });
      // TODO
      // show success notification
      changeForm(AVAILABLE_FORMS.CUSTOMER, customerData);
    } catch (error) {
      console.log(error);
      // TODO
      // show notification
    }
  };

  return (
    <Card>
      <FormWithButton
        Form={CustomerFormView}
        buttonConfig={{
          titleWhenEditing: "Salvar Alterações",
          defaultTitle: "Registrar Usuário",
        }}
        title="Nova OS"
        description="Dados do Usuário"
        formValidationSchema={schema}
        onFormSubmit={sendForm}
        preloadedData={loadedCustomer}
      />
    </Card>
  );
};

const CustomerFormView = ({ register, errors }) => (
  <div className="flex-col gap-3 md:gap-0">
    <div className="flex gap-3 md:gap-8 flex-wrap">
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Nome"
          placeholder="Nome"
          {...register("fullname")}
          error={errors.fullname}
        />
      </div>
      <div className="flex-1 sm:flex-none" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="CPF"
          placeholder="CPF"
          {...register("documentNumber")}
          error={errors.documentNumber}
        />
      </div>
    </div>
    <div className="flex gap-3 md:gap-8 flex-wrap">
      <div className="flex-1 md:flex-none" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Telefone"
          placeholder="Telefone"
          {...register("phone")}
          error={errors.phone}
        />
      </div>
      <div className="flex-1 md:flex-none" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Email"
          placeholder="Email"
          {...register("email")}
          error={errors.email}
        />
      </div>
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Endereço"
          placeholder="Endereço"
          {...register("address")}
          error={errors.address}
        />
      </div>
    </div>
  </div>
);

export { CustomerForm };
