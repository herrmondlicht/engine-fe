import React from "react";

import { ConfirmDeleteModal } from "components";
import { useLoader, useNotification } from "hooks";
import { engineAPI } from "utils";

const DeleteServiceModal = ({ serviceId, setServiceId }) => {
  const { showErrorNotification } = useNotification();
  const [isLoading, setIsLoading] = useLoader();
  const deleteService = async () => {
    setIsLoading(true);
    try {
      await engineAPI.service_orders.delete({
        urlExtension: serviceId,
      });
      setIsLoading(false);
      setServiceId(null);
    } catch (e) {
      showErrorNotification();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ConfirmDeleteModal
      handleClose={() => setServiceId(undefined)}
      isOpen={!!serviceId}
      onConfirmationClick={deleteService}
      isLoading={isLoading}
    />
  );
};

export { DeleteServiceModal };
