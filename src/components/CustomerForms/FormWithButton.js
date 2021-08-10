import { useCustomForm } from "hooks/useCustomForm";
import React, { useState } from "react";

import { Button } from "ui-fragments";

const FormWithButton = ({
  preloadedData,
  formValidationSchema,
  onFormSubmit,
  title,
  description,
  Form,
  buttonConfig: { titleWhenEditing, defaultTitle },
}) => {
  const {
    formMethods: { handleSubmit, formState, reset, ...formMethods },
    validationMethods: { errors, validate },
  } = useCustomForm({ schema: formValidationSchema, preloadedData });
  const [isLoading, setIsLoading] = useState(false);

  const { isDirty } = formState;
  const submit = async (data) => {
    if (!validate(data)) return;
    setIsLoading(true);
    reset(data);
    await onFormSubmit(data);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <p className="text-sm text-gray-600">{title}</p>
      <div className="my-3">
        <p className="text-2xl font-bold">{description}</p>
      </div>
      <div className="mt-3">
        <Form errors={errors} {...formMethods} />
      </div>
      <div className="flex justify-end">
        <Button
          showLoader={isLoading}
          variant={preloadedData && !isDirty ? "success" : "primary"}
        >
          {preloadedData ? titleWhenEditing : defaultTitle}
        </Button>
      </div>
    </form>
  );
};

export { FormWithButton };
