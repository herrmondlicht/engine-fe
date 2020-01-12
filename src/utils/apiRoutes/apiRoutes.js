import * as axios from "axios";

export const requestMaker = (
  { method, url, isLocked },
  { storage = window.localStorage } = {}
) => async ({ data, params }) => {
  const headers = {};
  if (isLocked) headers.Authorization = storage.getItem("token");
  const response = await axios({
    headers,
    method,
    url: `${process.env.REACT_APP_API_SERVICE}/api${url}`,
    data,
    params
  });
  return response;
};

const routes = {
  login: {
    url: "/session/login",
    isLocked: false
  }
};

const routesWithRequests = Object.keys(routes).reduce(
  (routesReduced, routeKey) => ({
    ...routesReduced,
    [routeKey]: {
      get: requestMaker({
        method: "get",
        isLocked: routes[routeKey].isLocked,
        url: routes[routeKey].url
      }),
      post: requestMaker({
        method: "post",
        isLocked: routes[routeKey].isLocked,
        url: routes[routeKey].url
      })
    }
  }),
  {}
);

export default routesWithRequests;
