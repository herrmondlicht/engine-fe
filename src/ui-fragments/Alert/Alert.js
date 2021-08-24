import { XCircleIcon } from "@heroicons/react/solid";
import { NOTIFICATION_TYPES } from "context";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "ui-fragments/Button";

const Alert = ({
  type,
  title,
  message,
  isRemovable,
  onCloseAction,
  duration,
}) => {
  const [opacity, setOpacity] = useState("0");

  const getVariationFromType = type => {
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

  const notificationClass = useMemo(
    () =>
      [
        "cursor-pointer relative bg-primary-0 z-40 rounded shadow-md flex transition-opacity duration-500 ease-in-out",
        notificationBackgroundClasses,
        `opacity-${opacity}`,
      ].join(" "),
    [notificationBackgroundClasses, opacity]
  );

  const onClose = useCallback(() => {
    setOpacity("0");
    setTimeout(() => {
      onCloseAction?.();
    }, 800);
  }, [onCloseAction]);

  useEffect(() => {
    setOpacity("1");
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration, onClose]);

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

export { Alert };
