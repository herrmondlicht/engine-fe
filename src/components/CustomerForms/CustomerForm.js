import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Card, Button } from "ui-fragments";
import { useValidator, useCombinedForms, AVAILABLE_FORMS } from "hooks";
import { engineAPI, yup } from "utils";

const schema = yup.object().shape({
  documentNumber: yup.string(),
  address: yup.string(),
  email: yup.string(),
  fullname: yup.string().required(),
  phone: yup.string(),
});

const CustomerForm = () => {
  const { register, handleSubmit, setValue, formState, reset } = useForm();
  const { errors, validate } = useValidator(schema);
  const [isLoading, setIsLoading] = useState(false);
  const {
    changeForm,
    context: { customers: savedCustomerForm },
  } = useCombinedForms();

  useEffect(() => {
    if (savedCustomerForm) {
      setValue("documentNumber", savedCustomerForm.document_number);
      setValue("address", savedCustomerForm.address);
      setValue("email", savedCustomerForm.email);
      setValue("fullname", savedCustomerForm.fullname);
      setValue("phone", savedCustomerForm.phone);
    }
    return () => {
      reset();
    };
  }, [savedCustomerForm, reset, setValue]);

  const getHTTPMethod = () => (savedCustomerForm?.id ? "patch" : "post");

  const sendForm = async ({ documentNumber, ...data }) => {
    const method = getHTTPMethod();
    try {
      const responseData = await engineAPI.customers[method]({
        urlExtension: savedCustomerForm?.id,
        data: {
          ...data,
          document_number: documentNumber,
        },
      });
      changeForm(AVAILABLE_FORMS.CUSTOMER, responseData.data);
      //show success notification
    } catch (error) {
      console.log(error);
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
                savedCustomerForm?.id && !formState.isDirty
                  ? "success"
                  : "primary"
              }
            >
              {savedCustomerForm?.id
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
