import React, { useState, useCallback } from "react";
import { Alert } from "ui-fragments";

export const NOTIFICATION_TYPES = {
  WARNING: "WARNING",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  ERROR: "ERROR",
};

export const NOTIFICATION_DURATION = {
  LONG: 10000,
  MEDIUM: 5000,
  SHORT: 2000,
};

const defaultNotificationSettings = {
  id: "standard",
  type: NOTIFICATION_TYPES.WARNING,
  title: "",
  message: "",
  isRemovable: true,
  duration: 5000,
};

const defaultContext = {
  showNotification: (settings = defaultNotificationSettings) => {},
  removeNotification: id => {},
};

const NotificationContext = React.createContext(defaultContext);
const { Provider } = NotificationContext;

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    (settings = defaultNotificationSettings) => {
      setNotifications(notifications => [
        ...notifications.filter(
          notification => notification.id !== settings.id
        ),
        { ...defaultNotificationSettings, ...settings },
      ]);
    },
    []
  );

  const removeNotification = id =>
    setNotifications(notifications =>
      notifications.filter(notification => notification.id !== id)
    );

  return (
    <>
      {notifications.length ? (
        <div className="fixed z-30 h-screen w-screen flex justify-center md:justify-end">
          <div
            className="relative right-0 mt-3 md:mr-5 md:mt-5 flex flex-col gap-5"
            style={{ width: "310px" }}
          >
            {notifications.map((notification, index) => (
              <Alert
                key={index}
                {...notification}
                onCloseAction={() => removeNotification(notification.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
      <Provider
        value={{
          showNotification,
          removeNotification,
        }}
      >
        {children}
      </Provider>
    </>
  );
};

export { NotificationProvider, NotificationContext };
