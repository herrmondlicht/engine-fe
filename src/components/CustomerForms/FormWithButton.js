import { PageTitle } from "components";
import { useCustomForm, useLoader } from "hooks";
import React, { useMemo } from "react";

import { Button } from "ui-fragments";

const FormWithButton = ({
  preloadedData,
  formValidationSchema,
  onFormSubmit,
  title,
  description,
  Form,
  buttonConfig: { titleWhenEditing, defaultTitle, ignoreVariantChanges },
  secondaryButton,
}) => {
  const {
    formMethods: { handleSubmit, formState, reset, ...formMethods },
    validationMethods: { errors, validate },
  } = useCustomForm({ schema: formValidationSchema, preloadedData });
  const [isLoading, setIsLoading] = useLoader(false);
  const isValidPreloadData = Object.values(preloadedData ?? {}).length > 0;
  const { isDirty } = formState;
  const submit = async data => {
    if (!validate(data)) return;
    setIsLoading(true);
    reset(data);
    await onFormSubmit(data);
    setIsLoading(false);
  };

  const showSuccessVariant = useMemo(
    () => isValidPreloadData && !isDirty,
    [isDirty, isValidPreloadData]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <PageTitle title={title} description={description} />
      <div className="mt-3">
        <Form errors={errors} reset={reset} {...formMethods} />
      </div>
      <div className="flex gap-3 justify-end mt-3 md:mt-8">
        {secondaryButton}
        <Button
          showLoader={isLoading}
          variant={
            showSuccessVariant && !ignoreVariantChanges ? "success" : "primary"
          }
        >
          {isValidPreloadData ? titleWhenEditing : defaultTitle}
        </Button>
      </div>
    </form>
  );
};

export { FormWithButton };
