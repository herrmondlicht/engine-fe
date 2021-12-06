import React from "react";
import propTypes from "prop-types";

import { Button, BUTTON_VARIANTS } from "ui-fragments";

const HeaderButton = ({ IconComponent, onClick }) => {
  return (
    <Button
      variant={BUTTON_VARIANTS.GHOST}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="flex justify-center items-center relative w-full h-full">
        <IconComponent className="text-primary-0 h-7 w-7 absolute" />
      </div>
    </Button>
  );
};

HeaderButton.propTypes = {
  IconComponent: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
};

export { HeaderButton };
