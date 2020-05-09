import React, { useEffect, useCallback, useState, useMemo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import ServiceItemsView from "./ServiceItemsView";
import engineAPI from "../../../utils/engineAPI/engineAPI";
import { Box } from "@material-ui/core";

const createServiceItemsContainer = ({ engineAPI }) =>
  function ServiceItemsContainer({ serviceOrderId }) {
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

    const updateServiceItem = useCallback(
      async ({ id, key: field, value }) => {
        if (id) {
          const updatedServiceItems = serviceItems.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                [field]: value,
              };
            }
            return item;
          });
          setServiceItems(updatedServiceItems);
          engineAPI.service_orders.patch({
            urlExtension: `${itemsURLExtension}/${id}`,
            data: {
              [field]: value,
              hasFocus: false,
            },
          });
        } else {
          const {
            data: { data },
          } = await engineAPI.service_orders.post({
            urlExtension: itemsURLExtension,
            data: {
              [field]: value,
            },
          });
          setServiceItems((oldServiceItemsArray) => [
            ...oldServiceItemsArray,
            { id: data.id, [field]: value, hasFocus: true },
          ]);
        }
      },
      [itemsURLExtension, serviceItems]
    );

    useEffect(() => {
      fetchServiceItems();
    }, [fetchServiceItems]);

    return (
      <>
        {isFetching ? (
          <Skeletons />
        ) : (
          <ServiceItemsView
            serviceItems={serviceItems}
            updateKeyValue={updateServiceItem}
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
