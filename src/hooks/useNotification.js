import { useContext } from "react";

import {
  NotificationContext,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
} from "context";

export const useNotification = () => {
  const { showNotification, removeNotification } =
    useContext(NotificationContext);

  const showErrorNotification = ({ id, title, message }) =>
    showNotification({
      duration: NOTIFICATION_DURATION.LONG,
      type: NOTIFICATION_TYPES.ERROR,
      id,
      title: title ?? "Opa!",
      message: message ?? "Algo errado aconteceu",
    });

  const showSuccessNotification = ({ id, title, message }) =>
    showNotification({
      duration: NOTIFICATION_DURATION.SHORT,
      type: NOTIFICATION_TYPES.SUCCESS,
      id,
      title: title ?? "Oba!",
      message: message ?? "Ação feita com sucesso",
    });

  return {
    showNotification,
    removeNotification,
    showErrorNotification,
    showSuccessNotification,
  };
};
