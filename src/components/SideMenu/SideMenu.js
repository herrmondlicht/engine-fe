import React from "react";

import Add from "@heroicons/react/solid/PlusIcon";
import List from "@heroicons/react/solid/ViewListIcon";
import ExitToApp from "@heroicons/react/solid/LogoutIcon";
import { useHistory, useLocation } from "react-router-dom";
import { Button, BUTTON_COMPONENT, BUTTON_VARIANTS } from "ui-fragments";
import { storageAPI, STORAGE_KEYS } from "utils";

function SideMenu({ storageAPI }) {
  const history = useHistory();
  const location = useLocation();

  const getIconClasses = link =>
    `h-7 w-7 ${
      location.pathname === link ? "text-primary-0" : "text-gray-500"
    }`;

  return (
    <div className="flex h-full items-center">
      <div className="flex flex-col gap-3 items-center px-2 py-3 shadow-md rounded-3xl bg-white">
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          as={BUTTON_COMPONENT.LINK}
          href="/customer_car"
        >
          <Add className={getIconClasses("/customer_car")} />
        </Button>
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          as={BUTTON_COMPONENT.LINK}
          href="/customers"
        >
          <List className={getIconClasses("/customers")} />
        </Button>
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          onClick={() => {
            storageAPI.removeItem(STORAGE_KEYS.TOKEN);
            history.replace("/login");
          }}
        >
          <ExitToApp className="text-error-1 h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

export const createMenu = ({ storageAPI }) => {
  const Menu = () => (
    <>
      <div className="block md:hidden w-full h-full">
        <div>
          <Button variant={BUTTON_VARIANTS.GHOST} />
          <Button variant={BUTTON_VARIANTS.GHOST} />
          <Button variant={BUTTON_VARIANTS.GHOST} />
        </div>
      </div>

      <div className="hidden md:block h-full ml-3">
        <SideMenu storageAPI={storageAPI} />
      </div>
    </>
  );

  return Menu;
};

export default createMenu({ storageAPI });
