import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";

import { Card, Input, ScreenLoader } from "ui-fragments";
import {
  engineAPI,
  fixPayloadKeys,
  yup,
  APIRoutes,
  convertFormKeyToAPI,
} from "utils";
import { FormWithButton } from "./FormWithButton";

const carFormSchema = yup.object().shape({
  model: yup.string().required(),
  make: yup.string().required(),
  manufactureYear: yup.number().required(),
  fuel: yup.string().required().required(),
  licensePlate: yup.string().required(),
  color: yup.string(),
  displacement: yup.string(),
});

const getHTTPMethod = (loadedData) => (loadedData ? "patch" : "post");

const CarForm = ({ loadedData }) => {
  const { cars, customer_cars, customers } = loadedData;
  const formDefaultData = {
    ...cars,
    ...customer_cars,
  };
  const history = useHistory();
  const { data: carsData, isValidating } = useSWR(
    APIRoutes.cars.url,
    async () => engineAPI.cars.get(),
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  );
  const carsAutocompleteData = carsData?.data;

  const sendNewCarForm = async ({ model, make, manufactureYear, fuel }) => {
    try {
      const payload = {
        ...(loadedData.cars ? loadedData.cars : {}),
        model,
        make,
        manufactureYear,
        fuel,
      };
      const data = await engineAPI.cars.post({
        data: fixPayloadKeys(payload, { fieldTranslator: convertFormKeyToAPI }),
      });
      return data?.data;
      //TODO
      //show success notification
    } catch (error) {
      console.log(error);
      return {};
      //TODO
      //show notification
    }
  };

  const sendNewCustomerCarForm = async ({
    color,
    displacement,
    licensePlate,
    car_id,
  }) => {
    const method = getHTTPMethod(loadedData?.customer_cars?.id);
    try {
      const payload = {
        ...(loadedData.customer_cars ? loadedData.customer_cars : {}),
        color,
        displacement,
        licensePlate,
        car_id,
        customer_id: customers.id,
      };
      const data = await engineAPI.customer_cars[method]({
        urlExtension: loadedData?.customer_cars?.id,
        data: fixPayloadKeys(payload, { fieldTranslator: convertFormKeyToAPI }),
      });
      //TODO
      //show success notification
      return data?.data;
    } catch (error) {
      console.log(error);
      return {};
      //TODO
      //show notification
    }
  };

  const onSubmit = async (data) => {
    const { id } = await sendNewCarForm(data);
    if (!id) {
      /**TODO: notification */
      return;
    }
    const { id: customerCarId } = await sendNewCustomerCarForm({
      ...data,
      car_id: id,
    });
    if (customerCarId) history.push(`/customer_car/${customerCarId}`);
  };

  return (
    <Card>
      <ScreenLoader isLoading={isValidating && !carsAutocompleteData}>
        <FormWithButton
          formValidationSchema={carFormSchema}
          Form={(props) => (
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
    () => carsAutocompleteData.map((car) => car.make).filter(getUnique),
    [carsAutocompleteData]
  );

  const modelsFilteredBySelectedMake = useMemo(
    () =>
      carsAutocompleteData
        .filter((car) => car.make === makeValue)
        .map((car) => car.model)
        .filter(getUnique),
    [carsAutocompleteData, makeValue]
  );

  return (
    <>
      <div className="flex gap-3 md:gap-8 flex-wrap">
        <div className="flex-1" style={{ minWidth: "200px" }}>
          <Input
            fw
            label="Marca"
            placeholder="Marca"
            {...register("make")}
            error={errors.model}
            list="carMakes"
          />

          <datalist id="carMakes">
            {makesOptions.map((make) => (
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
            {modelsFilteredBySelectedMake.map((model) => (
              <option value={model} key={model} />
            ))}
          </datalist>
        </div>
        <div className="flex-1 sm:flex-none" style={{ minWidth: "100px" }}>
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
            label="Placa"
            placeholder="Placa"
            {...register("licensePlate")}
            error={errors.licensePlate}
          />
        </div>
        <div className="flex-1" style={{ minWidth: "200px" }}>
          <Input
            fw
            label="Cilindradas"
            placeholder="Cilindradas"
            {...register("displacement")}
            error={errors.displacement}
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
    </>
  );
};

export { CarForm };
