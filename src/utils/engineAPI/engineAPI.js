import * as axios from "axios";
import _storage, { STORAGE_KEYS } from "../storage/storageAPI";
import routes from "./routes";

export const requestMaker = (
  { method, url, isLocked },
  { storage = window.localStorage } = {}
) => async ({ data, params = {}, urlExtension } = {}) => {
  const { query } = params;
  if (query) {
    params.query = JSON.stringify(query);
  }
  const headers = {};
  if (isLocked)
    headers.Authorization = `Bearer ${storage.getItem(STORAGE_KEYS.TOKEN)}`;
  try {
    const response = await axios({
      headers,
      method,
      baseURL: process.env.REACT_APP_API_SERVICE,
      url: `${url}${urlExtension ? "/" + urlExtension : ""}`,
      data,
      params,
    });
    return response;
  } catch (err) {
    if (err?.response?.status === 401 && isLocked) {
      storage.removeItem(STORAGE_KEYS.TOKEN);
      window.location.assign("/login");
    } else {
      throw err;
    }
  }
};

const createMethodsForURL = (routeObj) => ({
  get: requestMaker(
    {
      method: "get",
      isLocked: routeObj.isLocked,
      url: routeObj.url,
    },
    { storage: _storage }
  ),
  post: requestMaker(
    {
      method: "post",
      isLocked: routeObj.isLocked,
      url: routeObj.url,
    },
    { storage: _storage }
  ),
  patch: requestMaker(
    {
      method: "patch",
      isLocked: routeObj.isLocked,
      url: routeObj.url,
    },
    { storage: _storage }
  ),
  delete: requestMaker(
    {
      method: "delete",
      isLocked: routeObj.isLocked,
      url: routeObj.url,
    },
    { storage: _storage }
  ),
});

const createAllRequestsFromResources = (routes) => {
  const routesWithRequests = Object.keys(routes).reduce(
    (routesReduced, routeKey) => ({
      ...routesReduced,
      [routeKey]: {
        ...createMethodsForURL(routes[routeKey]),
      },
    }),
    {}
  );
  return routesWithRequests;
};

export default createAllRequestsFromResources(routes);
