import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { Camera } from "components";
import { engineAPI } from "utils";
import { useNotification } from "hooks";

const ServiceItemsImagePage = () => {
  const history = useHistory();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = useCallback(
    async base64Image => {
      try {
        setIsLoading(true);
        const { serviceOrder } = await engineAPI.service_order_images.post({
          data: { image: base64Image },
        });
        showSuccessNotification({
          id: "photoTaken",
          title: "Foto enviada!",
        });
        if (serviceOrder?.id) {
          history.push(`/services/${serviceOrder.id}`);
        }
      } catch (err) {
        showErrorNotification({
          id: "photoTakenError",
          title: "Não foi possível enviar a foto",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [history, showErrorNotification, showSuccessNotification]
  );

  const handleCancel = useCallback(() => {
    history.replace("/");
  }, [history]);

  return (
    <Camera
      onCapture={handleCapture}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
};

export default ServiceItemsImagePage;
