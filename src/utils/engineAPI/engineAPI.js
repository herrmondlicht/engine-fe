import axios from "axios";
import {
  storageAPI as _storage,
  STORAGE_KEYS,
  APIRoutes,
  ERROR_CODES,
} from "utils";

export const requestMaker =
  ({ method, url, isLocked }, { storage = window.localStorage } = {}) =>
  async ({ data, params = {}, urlExtension, options } = {}) => {
    const { query } = params;
    if (query) {
      params.query = JSON.stringify(query);
    }
    const headers = {};
    if (isLocked) {
      headers.Authorization = `Bearer ${storage.getItem(STORAGE_KEYS.TOKEN)}`;
    }
    try {
      const response = await axios({
        headers,
        method,
        // eslint-disable-next-line no-undef
        baseURL: process.env.REACT_APP_API_SERVICE,
        url: `${url}${urlExtension ? `/${urlExtension}` : ""}`,
        data,
        params,
        ...options,
      });
      return response?.data;
    } catch (err) {
      const data = err?.response?.data;
      if (data?.code === ERROR_CODES.AUTH00001) {
        storage.removeItem(STORAGE_KEYS.TOKEN);
        window.location.assign("/login");
      } else {
        if (data) {
          throw data;
        }
        throw err;
      }
    }
  };

const createMethodsForURL = routeObj => ({
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

const createAllRequestsFromResources = routes => {
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

export const engineAPI = createAllRequestsFromResources(APIRoutes);
