import * as axios from "axios";

export const requestMaker = (
  { method, url, isLocked },
  { storage = window.localStorage } = {}
) => ({ data, params }) => {
  const headers = {};
  if (isLocked) headers.Authorization = storage.getItem("token");
  return axios({
    headers,
    method,
    url,
    data,
    params
  });
};

const routes = {
  login: {
    url: "/login",
    isLocked: false
  }
};

const routesWithRequests = Object.keys(routes).reduce(
  (routesReduced, routeKey) => (
    {
      ...routesReduced,
      [routeKey]: {
        get: requestMaker({
          method: "get",
          isLocked: routes[routeKey].isLocked,
          url: routes[routeKey]
        }),
        post: requestMaker({
          method: "post",
          isLocked: routes[routeKey].isLocked,
          url: routes[routeKey]
        })
      }
    },
    {}
  )
);

export default routesWithRequests;
