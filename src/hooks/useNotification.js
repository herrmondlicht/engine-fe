import { useCallback, useContext } from "react";

import {
  NotificationContext,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
} from "context";

export const useNotification = () => {
  const { showNotification, removeNotification } =
    useContext(NotificationContext);

  const showErrorNotification = useCallback(
    ({ id, title, message } = {}) =>
      showNotification({
        duration: NOTIFICATION_DURATION.LONG,
        type: NOTIFICATION_TYPES.ERROR,
        id,
        title: title ?? "Opa!",
        message: message ?? "Algo errado aconteceu",
      }),
    [showNotification]
  );

  const showSuccessNotification = useCallback(
    ({ id, title, message }) =>
      showNotification({
        duration: NOTIFICATION_DURATION.SHORT,
        type: NOTIFICATION_TYPES.SUCCESS,
        id,
        title: title ?? "Oba!",
        message: message ?? "Ação feita com sucesso",
      }),
    [showNotification]
  );

  return {
    showNotification,
    removeNotification,
    showErrorNotification,
    showSuccessNotification,
  };
};
