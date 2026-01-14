import React, { useEffect } from "react";

import { useCustomerFormSubmit } from "hooks";

import { Input, Card } from "ui-fragments";
import { convertAPIkeyToForm, fixPayloadKeys, yup } from "utils";
import { FormWithButton } from "./FormWithButton";

const schema = yup.object().shape({
  documentNumber: yup.string(),
  address: yup.string(),
  email: yup.string(),
  fullname: yup.string().required(),
  phone: yup.string(),
});

const CustomerForm = ({ loadedCustomer }) => {
  const sendForm = useCustomerFormSubmit(loadedCustomer);

  return (
    <Card>
      <FormWithButton
        Form={props => (
          <CustomerFormView {...props} loadedCustomer={loadedCustomer} />
        )}
        buttonConfig={{
          titleWhenEditing: "Salvar Alterações",
          defaultTitle: "Registrar Cliente",
        }}
        title={loadedCustomer?.id ? "Editar OS" : "Nova OS"}
        description="Dados do Cliente"
        formValidationSchema={schema}
        onFormSubmit={sendForm}
        preloadedData={loadedCustomer}
      />
    </Card>
  );
};

const CustomerFormView = ({ register, errors, reset, loadedCustomer }) => {
  useEffect(() => {
    reset(
      fixPayloadKeys(loadedCustomer, { fieldTranslator: convertAPIkeyToForm })
    );
  }, [loadedCustomer, reset]);
  return (
    <div className="flex flex-col gap-3 md:gap-8">
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
        <div className="flex-1" style={{ minWidth: "250px" }}>
          <Input
            fw
            label="Email"
            placeholder="Email"
            {...register("email")}
            error={errors.email}
          />
        </div>
        <div className="flex-1" style={{ minWidth: "250px" }}>
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
};

export { CustomerForm };
