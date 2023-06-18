import React from "react";
import { Text, Title } from "ui-fragments";

const PageTitle = ({ description, title }) => {
  return (
    <div>
      <Text color="text-gray-600">{title}</Text>
      <div className="mt-3 mb-5">
        <Title>{description}</Title>
      </div>
    </div>
  );
};

export { PageTitle };
