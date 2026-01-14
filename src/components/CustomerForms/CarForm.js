import { useCarFormSubmit } from "hooks";
import React, { useState } from "react";
import { useMemo } from "react";
import useSWR from "swr";

import { Card, Input, ScreenLoader } from "ui-fragments";
import { engineAPI, yup, APIRoutes } from "utils";
import { FormWithButton } from "./FormWithButton";

const carFormSchema = yup.object().shape({
  model: yup.string().required(),
  make: yup.string().required(),
  manufactureYear: yup.number().required(),
  fuel: yup.string().required().required(),
  licensePlate: yup.string().required(),
  color: yup.string(),
});

const CarForm = ({ loadedData, onSubmitAction }) => {
  const { cars, customer_cars, customers } = loadedData;
  const [customerCarData, setCustomerCarData] = useState(customer_cars);
  const onSubmit = useCarFormSubmit({
    customerCarData,
    cars,
    customers,
    setCustomerCarData,
    onSubmitAction,
  });

  const formDefaultData = {
    ...cars,
    ...customerCarData,
  };
  const { data: carsData, isValidating } = useSWR(
    APIRoutes.cars.url,
    async () => engineAPI.cars.get(),
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  );
  const carsAutocompleteData = carsData?.data;

  return (
    <Card>
      <ScreenLoader isLoading={isValidating && !carsAutocompleteData}>
        <FormWithButton
          formValidationSchema={carFormSchema}
          Form={props => (
            <CarFormView
              {...props}
              carsAutocompleteData={carsAutocompleteData}
            />
          )}
          buttonConfig={{
            defaultTitle: "Registrar Veículo",
            titleWhenEditing: "Salvar Alterações",
          }}
          onFormSubmit={onSubmit}
          preloadedData={formDefaultData}
          description="Dados do veículo"
          title="Nova OS"
        />
      </ScreenLoader>
    </Card>
  );
};

const CarFormView = ({
  register,
  errors,
  carsAutocompleteData = [],
  watch,
}) => {
  const getUnique = (make, index, array) => array.indexOf(make) === index;
  const makeValue = watch("make");

  const makesOptions = useMemo(
    () => carsAutocompleteData.map(car => car.make).filter(getUnique),
    [carsAutocompleteData]
  );

  const modelsFilteredBySelectedMake = useMemo(
    () =>
      carsAutocompleteData
        .filter(car => car.make === makeValue)
        .map(car => car.model)
        .filter(getUnique),
    [carsAutocompleteData, makeValue]
  );

  return (
    <div className="flex gap-3 md:gap-8 flex-wrap">
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          uppercase
          label="Placa"
          placeholder="Placa"
          {...register("licensePlate")}
          error={errors.licensePlate}
        />
      </div>
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Marca"
          placeholder="Marca"
          {...register("make")}
          error={errors.make}
          list="carMakes"
        />

        <datalist id="carMakes">
          {makesOptions.map(make => (
            <option value={make} key={make} />
          ))}
        </datalist>
      </div>
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Modelo"
          placeholder="Modelo"
          {...register("model")}
          error={errors.model}
          list="carModels"
        />
        <datalist id="carModels">
          {modelsFilteredBySelectedMake.map(model => (
            <option value={model} key={model} />
          ))}
        </datalist>
      </div>
      <div className="flex-1" style={{ minWidth: "100px" }}>
        <Input
          fw
          label="Ano"
          placeholder="Ano"
          {...register("manufactureYear")}
          error={errors.manufactureYear}
        />
      </div>
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Combustível"
          placeholder="Combustível"
          {...register("fuel")}
          error={errors.fuel}
        />
      </div>
      <div className="flex-1" style={{ minWidth: "200px" }}>
        <Input
          fw
          label="Cor"
          placeholder="Cor"
          {...register("color")}
          error={errors.color}
        />
      </div>
    </div>
  );
};

export { CarForm };
