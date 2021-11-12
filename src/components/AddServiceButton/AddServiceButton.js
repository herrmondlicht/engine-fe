import React, { useState } from "react";

import { Button, BUTTON_SIZES } from "ui-fragments";
import { useNotification } from "hooks";
import { engineAPI, fixPayloadKeys } from "utils";

const AddServiceButton = ({ customerCarId, onServiceAdd, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorNotification } = useNotification();
  const onButtonClick = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await engineAPI.service_orders.post({
        data: fixPayloadKeys({ customerCarId }),
      });
      if (!data?.id) throw new Error("No service ID found");
      onServiceAdd?.(data);
    } catch (e) {
      console.log(e);
      showErrorNotification({
        message: "Nāo consegui adicionar o serviço ",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={BUTTON_SIZES.SMALL}
      showLoader={isLoading}
      onClick={onButtonClick}
    >
      <div className="flex items-center gap-3">{children}</div>
    </Button>
  );
};

export { AddServiceButton };
