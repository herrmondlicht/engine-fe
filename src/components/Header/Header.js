import React from "react";
import styled from "@emotion/styled";

import { Card, CARD_VARIANTS } from "ui-fragments";

const HeaderWrapper = styled.div`
  :before {
    content: "";
    position: absolute;
    top: 0;
    height: 120px;
    left: -5px;
    right: -5px;
    z-index: 10;
    background-image: linear-gradient(to bottom, #f7f7fc 65%, transparent 100%);
  }
`;

const Header = ({ leftButton }) => {
  return (
    <HeaderWrapper className="w-full h-full flex justify-center items-center gap-6 relative pt-3">
      <div className="flex justify-center items-center rounded-full bg-white shadow-md py-2 z-20 h-full w-14 md:w-16">
        {leftButton}
      </div>
      <div className="w-full flex flex-1 justify-center items-center h-full z-20">
        <Card variant={CARD_VARIANTS.SMALL} className="flex-1 h-full"></Card>
      </div>
    </HeaderWrapper>
  );
};

export { Header };
