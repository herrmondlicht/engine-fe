import React, { useMemo } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Text } from "ui-fragments";

const SideMenuItem = ({ to, itemIcon, title }) => {
  const match = useRouteMatch(to);
  const isActiveRoute = !!match;

  const activeRouteClasses = useMemo(
    () => ["bg-primary-2", "text-white", "hover:text-white"].join(" "),
    []
  );

  const inactiveClasses = useMemo(
    () => ["hover:text-primary-0", "text-gray-500"].join(" "),
    []
  );

  return (
    <Link to={to} className="flex w-full">
      <div
        className={`flex w-full gap-3 items-center rounded-r-full ${
          isActiveRoute ? activeRouteClasses : inactiveClasses
        }`}
      >
        <div
          className={`w-1 h-full rounded-r-full ${
            isActiveRoute ? "bg-primary-1" : ""
          }`}
        />
        <div className="flex gap-3 items-center p-4">
          <div
            className={`${
              isActiveRoute ? "text-white" : "hover:text-primary-0"
            }`}
          >
            {itemIcon}
          </div>
          <Text>{title}</Text>
        </div>
      </div>
    </Link>
  );
};

export { SideMenuItem };
