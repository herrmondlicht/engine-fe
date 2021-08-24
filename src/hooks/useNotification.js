import { useContext } from "react";

import { NotificationContext } from "context";

export const useNotification = () => {
  const { showNotification, removeNotification } =
    useContext(NotificationContext);
  return { showNotification, removeNotification };
};
