import React, { useState } from "react";

import { Input, Card, Button } from "ui-fragments";
import { useCustomForm } from "hooks/useCustomForm";
import { engineAPI, yup } from "utils";

const carFormSchema = yup.object().shape({
  model: yup.string().required(),
  make: yup.string().required(),
  manufactureYear: yup.string().required(),
  fuel: yup.string().required().required(),
});

const CarForm = ({ loadedData }) => {
  const getHTTPMethod = () => (loadedData?.id ? "patch" : "post");
  const {
    formMethods: { register, handleSubmit, formState },
    validationMethods: { validate, errors },
  } = useCustomForm({
    schema: carFormSchema,
    preloadedData: loadedData,
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendForm = async ({ documentNumber, ...data }) => {
    const method = getHTTPMethod();
    try {
      await engineAPI.customers[method]({
        urlExtension: loadedData?.id,
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
          <p className="text-2xl font-bold">Dados do veículo</p>
        </div>
        <div className="mt-3">
          <div className="flex gap-3">
            <div className="w-full">
              <Input
                fw
                label="Modelo"
                placeholder="Modelo"
                {...register("model")}
                error={errors.model}
              />
            </div>
            <div className="w-full">
              <Input
                fw
                label="Marca"
                placeholder="Marca"
                {...register("make")}
                error={errors.make}
              />
            </div>
            <div className="w-1/3">
              <Input
                fw
                label="Ano"
                placeholder="Ano"
                {...register("manufactureYear")}
                error={errors.manufactureYear}
              />
            </div>
            <div className="w-full">
              <Input
                fw
                label="Combustivel"
                placeholder="Combustivel"
                {...register("fuel")}
                error={errors.fuel}
              />
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <Button
              showLoader={isLoading}
              variant={
                loadedData?.id && !formState.isDirty ? "success" : "primary"
              }
            >
              {loadedData?.id ? "Salvar Alterações" : "Registrar Usuário"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export { CarForm };
