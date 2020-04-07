import React from "react";
import ServiceItemsView from "./ServiceItemsView";

const createServiceItemsContainer = ({ engineAPI }) =>
  function ServiceItemsContainer() {
    return <ServiceItemsView />;
  };

export default createServiceItemsContainer({});
