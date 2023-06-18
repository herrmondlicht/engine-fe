import React from "react";
import { Label, TEXT_ALIGN, Text } from "ui-fragments";

const LineInfo = ({ title, description }) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-3 gap-1">
      <Label>{title}</Label>
      <div className="flex flex-1 md:justify-end">
        <Text align={TEXT_ALIGN.RIGHT}>{description || "-"}</Text>
      </div>
    </div>
  );
};

export { LineInfo };
