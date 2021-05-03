import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Input, Card, Button } from "ui-fragments";

const schema = yup.object().shape({
  CPF: yup.string(),
  address: yup.string(),
  email: yup.string(),
  name: yup.string().required(),
  phone: yup.string(),
});

const useValidator = (validator) => {
  const [errors, setErrors] = useState({});
  const validate = useCallback(
    (object) => {
      try {
        return validator.validateSync(object);
      } catch (e) {
        setErrors({ [e.path]: e.errors[0] });
      }
    },
    [validator]
  );

  return { validate, errors };
};

const CustomerForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors, validate } = useValidator(schema);

  const submit = (data) => {
    console.log(data);
    validate(data);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Card>
        <p className="text-sm text-gray-600">Nova OS</p>
        <div className="my-3">
          <p className="text-2xl font-bold">Dados do Cliente</p>
        </div>
        <div className="mt-3">
          <div className="flex">
            <div className="w-1/3">
              <Input fw label="CPF" placeholder="CPF" {...register("CPF")} error={errors.cpf} />
            </div>
            <div className="ml-12 w-full">
              <Input fw label="Endereço" placeholder="Endereço" error={errors.address} />
            </div>
          </div>
          <div className="flex mt-3">
            <div className="w-1/3">
              <Input fw label="Email" placeholder="Email" error={errors.email} />
            </div>
            <div className="ml-12 w-full flex">
              <div className="w-full">
                <Input fw label="Nome" placeholder="Nome" error={errors.name} />
              </div>
              <div className="ml-12 w-full">
                <Input fw label="Telefone" placeholder="Telefone" />
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <Button>Registrar Usuário</Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export { CustomerForm };
