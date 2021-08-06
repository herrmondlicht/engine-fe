import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Card, Button } from "ui-fragments";
import { useValidator } from "hooks";
import { engineAPI, yup } from "utils";

const schema = yup.object().shape({
  documentNumber: yup.string(),
  address: yup.string(),
  email: yup.string(),
  fullname: yup.string().required(),
  phone: yup.string(),
});

const CustomerForm = ({loadedCustomer}) => {
  const { register, handleSubmit, setValue, formState, reset } = useForm();
  const { errors, validate } = useValidator(schema);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loadedCustomer) {
      setValue("documentNumber", loadedCustomer.document_number);
      setValue("address", loadedCustomer.address);
      setValue("email", loadedCustomer.email);
      setValue("fullname", loadedCustomer.fullname);
      setValue("phone", loadedCustomer.phone);
    }
    return () => {
      reset();
    };
  }, [loadedCustomer, reset, setValue]);

  const getHTTPMethod = () => (loadedCustomer?.id ? "patch" : "post");

  const sendForm = async ({ documentNumber, ...data }) => {
    const method = getHTTPMethod();
    try {
      await engineAPI.customers[method]({
        urlExtension: loadedCustomer?.id,
        data: {
          ...data,
          document_number: documentNumber,
        },
      });
      //TODO
      //show success notification
    } catch (error) {
      console.log(error);
      //TODO
      //show notification
    }
  };

  const submit = async (data) => {
    if (!validate(data)) return;
    setIsLoading(true);
    await sendForm(data);
    setIsLoading(false);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)}>
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
                {...register("documentNumber")}
                error={errors.documentNumber}
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
                  {...register("fullname")}
                  error={errors.fullname}
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
            <Button
              showLoader={isLoading}
              variant={
                loadedCustomer?.id && !formState.isDirty
                  ? "success"
                  : "primary"
              }
            >
              {loadedCustomer?.id
                ? "Salvar Alterações"
                : "Registrar Usuário"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export { CustomerForm };
