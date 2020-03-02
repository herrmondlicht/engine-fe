import * as axios from "axios";
import _storage, { STORAGE_KEYS } from "../storage/storageAPI";

const routes = {
  login: {
    url: "/session/login",
    isLocked: false
  },
  cars: {
    url: "/cars",
    isLocked: true,
  },
  carsAutocomplete: {
    url: "/cars/autocomplete",
    isLocked: true
  }
};


export const requestMaker = (
  { method, url, isLocked },
  { storage = window.localStorage } = {}
) => async ({ data, params = {} } = {}) => {
  const {query} = params;
  if(query){
    params.query = JSON.stringify(query);
  }
  const headers = {};
  if (isLocked) headers.Authorization = `Bearer ${storage.getItem(STORAGE_KEYS.TOKEN)}`;
  try {
    const response = await axios({
      headers,
      method,
      url: `${process.env.REACT_APP_API_SERVICE}/api${url}`,
      data,
      params
    });

    return response;
  }
  catch (err) {
    if (err?.response?.status === 401 && isLocked) {
      storage.removeItem(STORAGE_KEYS.TOKEN)
      window.location.assign('/login')
    }
    else {
      throw err
    }
  }

};

const routesWithRequests = Object.keys(routes).reduce(
  (routesReduced, routeKey) => ({
    ...routesReduced,
    [routeKey]: {
      get: requestMaker({
        method: "get",
        isLocked: routes[routeKey].isLocked,
        url: routes[routeKey].url,
      }, { storage: _storage }),
      post: requestMaker({
        method: "post",
        isLocked: routes[routeKey].isLocked,
        url: routes[routeKey].url,
      }, { storage: _storage })
    }
  }),
  {}
);

export default routesWithRequests;
