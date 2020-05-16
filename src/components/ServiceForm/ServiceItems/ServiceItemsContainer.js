import React, { useEffect, useCallback, useState, useMemo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import ServiceItemsView from "./ServiceItemsView";
import engineAPI from "../../../utils/engineAPI/engineAPI";
import { Box } from "@material-ui/core";

const createServiceItemsContainer = ({ engineAPI }) =>
  function ServiceItemsContainer({ serviceOrderId, updateTotalItemsPrice }) {
    const [serviceItems, setServiceItems] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const itemsURLExtension = useMemo(() => `${serviceOrderId}/items`, [
      serviceOrderId,
    ]);

    const fetchServiceItems = useCallback(async () => {
      setIsFetching(true);
      try {
        const {
          data: { data },
        } = await engineAPI.service_orders.get({
          urlExtension: itemsURLExtension,
        });
        setServiceItems(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsFetching(false);
      }
    }, [itemsURLExtension]);

    const editItemInArray = ({ id, field, value }) => (item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    };

    const updateServiceItem = useCallback(
      async ({ id, key: field, value }) => {
        setServiceItems((oldServiceItemsArray) =>
          oldServiceItemsArray.map(editItemInArray({ id, field, value }))
        );
        engineAPI.service_orders.patch({
          urlExtension: `${itemsURLExtension}/${id}`,
          data: {
            [field]: value,
            hasFocus: false,
          },
        });
      },
      [itemsURLExtension]
    );

    const createNewServiceItem = useCallback(async () => {
      const {
        data: { data },
      } = await engineAPI.service_orders.post({
        urlExtension: itemsURLExtension,
      });
      setServiceItems((oldServiceItemsArray) => [
        ...oldServiceItemsArray,
        { id: data.id, hasFocus: true },
      ]);
    }, [itemsURLExtension]);

    useEffect(() => {
      fetchServiceItems();
    }, [fetchServiceItems]);

    useEffect(() => {
      const totalPrice = serviceItems.reduce(
        (prev, { quantity = 0, unit_price = 0 }) =>
          prev + quantity * unit_price,
        0
      );
      updateTotalItemsPrice(totalPrice);
    }, [updateTotalItemsPrice, serviceItems]);

    return (
      <>
        {isFetching ? (
          <Skeletons />
        ) : (
          <ServiceItemsView
            serviceItems={serviceItems}
            updateKeyValue={updateServiceItem}
            createNewServiceItem={createNewServiceItem}
          />
        )}
      </>
    );
  };

const Skeletons = () => {
  return (
    <>
      <Box mt={2}>
        <Skeleton variant="rect" width={"100%"} height={40} />
      </Box>
      <Box mt={2}>
        <Skeleton variant="rect" width={"100%"} height={40} />
      </Box>
      <Box mt={2}>
        <Skeleton variant="rect" width={"100%"} height={40} />
      </Box>
      <Box mt={2}>
        <Skeleton variant="rect" width={"100%"} height={40} />
      </Box>
      <Box mt={2}>
        <Skeleton variant="rect" width={"100%"} height={40} />
      </Box>
    </>
  );
};

export default createServiceItemsContainer({ engineAPI });
