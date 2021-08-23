import React, { useEffect, useCallback, useState, useMemo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import { engineAPI } from "utils";
import { Box } from "@material-ui/core";
import ServiceItemsView from "./ServiceItemsView";

const createServiceItemsContainer = ({ engineAPI }) =>
  function ServiceItemsContainer({ serviceOrderId, updateTotalItemsPrice }) {
    const [serviceItems, setServiceItems] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const itemsURLExtension = useMemo(
      () => `${serviceOrderId}/items`,
      [serviceOrderId],
    );

    const fetchServiceItems = useCallback(async () => {
      if (serviceOrderId) {
        try {
          setIsFetching(true);
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
      }
    }, [itemsURLExtension, serviceOrderId]);

    const editItemInArray =
      ({ id, field, value }) =>
        (item) => {
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
          oldServiceItemsArray.map(editItemInArray({ id, field, value })),
        );
        engineAPI.service_orders.patch({
          urlExtension: `${itemsURLExtension}/${id}`,
          data: {
            [field]: value,
          },
        });
      },
      [itemsURLExtension],
    );

    const deleteServiceItem = useCallback(
      async ({ id }) => {
        setServiceItems((oldServiceItems) =>
          oldServiceItems.filter((serviceItem) => serviceItem.id !== id),
        );
        engineAPI.service_orders.delete({
          urlExtension: `${itemsURLExtension}/${id}`,
        });
      },
      [itemsURLExtension],
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
        // eslint-disable-next-line camelcase
          prev + quantity * unit_price,
        0,
      );
      updateTotalItemsPrice(totalPrice);
    }, [updateTotalItemsPrice, serviceItems]);

    return (
      <>
        {isFetching ? (
          <Skeletons />
        ) : (
          <ServiceItemsView
            deleteServiceItem={deleteServiceItem}
            serviceItems={serviceItems}
            updateKeyValue={updateServiceItem}
            createNewServiceItem={createNewServiceItem}
          />
        )}
      </>
    );
  };

const Skeletons = () => (
  <>
    <Box mt={2}>
      <Skeleton variant="rect" width="100%" height={40} />
    </Box>
    <Box mt={2}>
      <Skeleton variant="rect" width="100%" height={40} />
    </Box>
    <Box mt={2}>
      <Skeleton variant="rect" width="100%" height={40} />
    </Box>
    <Box mt={2}>
      <Skeleton variant="rect" width="100%" height={40} />
    </Box>
    <Box mt={2}>
      <Skeleton variant="rect" width="100%" height={40} />
    </Box>
  </>
);

export default createServiceItemsContainer({ engineAPI });
