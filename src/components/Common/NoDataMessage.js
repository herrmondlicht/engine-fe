import React from "react";
import { Title, TITLE_SIZES } from "ui-fragments";

const NoDataMessage = () => {
  return (
    <div className="flex w-full justify-center">
      <Title size={TITLE_SIZES.SMALL}>
        Hm... parece que nāo tem dados ainda
      </Title>
    </div>
  );
};

export { NoDataMessage };
