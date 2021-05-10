import React from "react";
import { useForm } from "react-hook-form";

import { Input, Card, Button } from "ui-fragments";
import { useValidator } from "hooks";
import { yup } from "utils";

const schema = yup.object().shape({
  CPF: yup.string(),
  address: yup.string(),
  email: yup.string(),
  name: yup.string().required(),
  phone: yup.string(),
});

const CustomerForm = () => {
  const { register, handleSubmit } = useForm();
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
              <Input
                fw
                label="CPF"
                placeholder="CPF"
                {...register("CPF")}
                error={errors.cpf}
              />
            </div>
            <div className="ml-12 w-full">
              <Input
                fw
                label="Endereço"
                placeholder="Endereço"
                {...register("address")}
                error={errors.address}
              />
            </div>
          </div>
          <div className="flex mt-3">
            <div className="w-1/3">
              <Input
                fw
                label="Email"
                placeholder="Email"
                {...register("email")}
                error={errors.email}
              />
            </div>
            <div className="ml-12 w-full flex">
              <div className="w-full">
                <Input
                  fw
                  label="Nome"
                  placeholder="Nome"
                  {...register("name")}
                  error={errors.name}
                />
              </div>
              <div className="ml-12 w-full">
                <Input
                  fw
                  label="Telefone"
                  placeholder="Telefone"
                  {...register("phone")}
                />
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
