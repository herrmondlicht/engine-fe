import React from "react";

import Add from "@heroicons/react/solid/PlusIcon";
import List from "@heroicons/react/solid/ViewListIcon";
import { Link, useHistory } from "react-router-dom";
import { Button, BUTTON_VARIANTS } from "ui-fragments";
import { storageAPI, STORAGE_KEYS } from "utils";
import EngineImage from "assets/engine_logo_no_bg.png";
import { SideMenuItem } from "./SideMenuItem";

function SideMenu({ storageAPI }) {
  const history = useHistory();
  return (
    <div className="flex flex-col w-48 h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="my-14 mx-5">
          <Link to={"/"}>
            <img src={EngineImage} alt="logo" className="w-full" />
          </Link>
        </div>
        <SideMenuItem
          to="/customer_car"
          title={"Nova OS"}
          itemIcon={<Add className={"h-5 w-5"} />}
        />
        <SideMenuItem
          to="/customers"
          title={"Clientes"}
          itemIcon={<List className={"h-5 w-5"} />}
        />
        <div className="flex justify-center my-8 px-6">
          <Button
            fw
            variant={BUTTON_VARIANTS.HOLLOW}
            size={"small"}
            onClick={() => {
              storageAPI.removeItem(STORAGE_KEYS.TOKEN);
              history.replace("/login");
            }}
            showVariantIcon={false}
          >
            Sair
          </Button>
        </div>
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

      <div className="hidden xl:block h-full">
        <SideMenu storageAPI={storageAPI} />
      </div>
    </>
  );

  return Menu;
};

export default createMenu({ storageAPI });
