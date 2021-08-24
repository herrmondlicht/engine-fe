import React, { useEffect, useMemo, useState, useCallback } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Button } from "ui-fragments";

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
  title: "Opa!",
  message: "Alguma coisa aconteceu!",
  isRemovable: true,
  duration: 5000,
};

const defaultContext = {
  showNotification: (settings = defaultNotificationSettings) => {},
  removeNotification: (id) => {},
};

const NotificationContext = React.createContext(defaultContext);
const { Provider } = NotificationContext;

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  console.log("nt", notifications);

  const showNotification = useCallback(
    (settings = defaultNotificationSettings) => {
      console.log("will add new", settings);
      setNotifications((notifications) =>
        [
          ...notifications.filter((notification) =>
            notification.id !== settings.id,
          ),
          { ...defaultNotificationSettings, ...settings },
        ],
      );
    }, []);

  const removeNotification = (id) =>
    setNotifications((notifications) => notifications.filter((notification) =>
      notification.id !== id,
    ));

  return (
    <>
      <div className="absolute w-full h-full flex justify-center md:justify-end">
        <div
          className="relative right-0 mt-3 md:mr-5 md:mt-5 flex flex-col gap-5"
          style={{ width: "310px" }}
        >
          {notifications.map((notification) => (
            <Alert
              key={notification.id}
              {...notification}
              onCloseAction={() => removeNotification(notification.id)}
            />),
          )}
        </div>
      </div>
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

// eslint-disable-next-line no-unused-vars
const Alert = ({
  type, title, message, isRemovable, onCloseAction, duration,
}) => {
  const [opacity, setOpacity] = useState("0");

  const getVariationFromType = (type) => {
    switch (type) {
    case NOTIFICATION_TYPES.ERROR:
      return "error-0";
    case NOTIFICATION_TYPES.INFO:
      return "primary-0";
    case NOTIFICATION_TYPES.SUCCESS:
      return "success-0";
    default:
      return "warning-0";
    }
  };

  const notificationBackgroundClasses = useMemo(() => {
    const variation = getVariationFromType(type);
    return `bg-${variation}`;
  }, [type]);

  const notificationClass = useMemo(() => [
    "cursor-pointer relative bg-primary-0 z-40 rounded shadow-md flex transition-opacity duration-500 ease-in-out",
    notificationBackgroundClasses,
    `opacity-${opacity}`,
  ].join(" "), [opacity]);

  const onClose = () => {
    setOpacity("0");
    setTimeout(() => {
      onCloseAction?.();
    }, 800);
  };

  useEffect(() => {
    setOpacity("1");
    setTimeout(() => {
      onClose();
    }, duration);
  }, [duration]);

  return (
    <div className={notificationClass}>
      <div className="p-4 px-6 flex flex-col gap-1 flex-1">
        {title ? <p className="text-white text-lg font-bold">{title}</p> : null}
        <p className="text-white text-md">{message}</p>
      </div>
      {isRemovable ? (
        <div className="relative" style={{ flexBasis: "30px" }}>
          <div className="absolute top-0 right-0 h-full flex justify-center items-center">
            <Button variant="ghost" onClick={onClose}>
              <XCircleIcon className="text-white text-sm h-7 w-7" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { NotificationProvider, NotificationContext };
