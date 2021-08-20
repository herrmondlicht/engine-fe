import React, { useMemo } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Button } from "ui-fragments";

const NOTIFICATION_TYPES = {
  WARNING: "WARNING",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  ERROR: "ERROR",
};

const defaultNotificationSettings = {
  id: "standard",
  type: NOTIFICATION_TYPES.WARNING,
  title: "Opa!",
  message: "Alguma coisa aconteceu!",
  isRemovable: true,
};

const defaultContext = {
  showNotification: (settings = defaultNotificationSettings) => {},
};

const NotificationContext = React.createContext(defaultContext);
const { Provider } = NotificationContext;

const NotificationProvider = ({ children }) => {
  const showNotification = () => {};
  return (
    <>
      <div className="absolute w-full h-full flex justify-center md:justify-end">
        <div
          className="relative right-0 mt-3 md:mr-5 md:mt-5 flex flex-col gap-5"
          style={{ width: "310px" }}
        >
          {/* <Alert
            title="Titulo massa"
            message="Notificacao zero bala"
            isRemovable
          />
          <Alert
            type={NOTIFICATION_TYPES.ERROR}
            title="Titulo massa"
            message="Notificacao zero bala"
            isRemovable
          />
          <Alert
            type={NOTIFICATION_TYPES.SUCCESS}
            title="Titulo massa"
            message="Notificacao zero bala"
            isRemovable
          /> */}
        </div>
      </div>
      <Provider
        value={{
          showNotification,
        }}
      >
        {children}
      </Provider>
    </>
  );
};

const Alert = ({ type, title, message, isRemovable, onCloseAction }) => {
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

  const notificationClass = [
    "relative bg-primary-0 z-40 rounded shadow-md flex",
    notificationBackgroundClasses,
  ].join(" ");

  return (
    <div className={notificationClass}>
      <div className="p-4 px-6 flex flex-col gap-1 flex-1">
        {title ? <p className="text-white text-lg font-bold">{title}</p> : null}
        <p className="text-white text-md">{message}</p>
      </div>
      {isRemovable ? (
        <div className="relative pr-3">
          <div className="absolute top-0 right-0 h-full flex justify-center items-center">
            <Button variant="ghost" onClick={onCloseAction}>
              <XCircleIcon className="text-white text-sm h-7 w-7" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { NotificationProvider, NotificationContext };
