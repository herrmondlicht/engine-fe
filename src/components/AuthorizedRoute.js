import React from "react";
import { Route, Redirect } from "react-router-dom";
import { storageAPI, STORAGE_KEYS } from "utils";

function AuthorizedRoute(props) {
  const token = storageAPI.getItem(STORAGE_KEYS.TOKEN);
  return (
    <Route path={props.path} exact={props.exact}>
      {token ? <props.Component /> : <Redirect to={{ pathname: "/login" }} />}
    </Route>
  );
}

export default AuthorizedRoute;
