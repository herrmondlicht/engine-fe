import React from "react";

import List from "@heroicons/react/solid/ViewListIcon";
import Dashboard from "@heroicons/react/solid/ChartBarIcon";
import {
  Button,
  BUTTON_COMPONENT,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Text,
  TEXT_SIZES,
} from "ui-fragments";

function BottomMenu() {
  return (
    // TODO: Fix this!!
    <div className="fixed bottom-0 w-full z-20 pt-1 flex w-full p-2 w-full border border-grey-100 shadow-2xl rounded-t-3xl bg-white items-center justify-center gap-8">
      <Button
        as={BUTTON_COMPONENT.LINK}
        size={BUTTON_SIZES.SMALL}
        variant={BUTTON_VARIANTS.GHOST}
        href={"/"}
      >
        <div className="flex flex-col justify-center items-center">
          <Dashboard height={20} width={20} />
          <Text size={TEXT_SIZES.VERY_SMALL}>Relatórios</Text>
        </div>
      </Button>
      <Button
        as={BUTTON_COMPONENT.LINK}
        size={BUTTON_SIZES.SMALL}
        variant={BUTTON_VARIANTS.GHOST}
        href={"/customers"}
      >
        <div className="flex flex-col justify-center items-center">
          <List height={20} width={20} />
          <Text size={TEXT_SIZES.VERY_SMALL}>Ordens de Serviço</Text>
        </div>
      </Button>
    </div>
  );
}

export default BottomMenu;
