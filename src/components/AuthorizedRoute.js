import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "../utils/appRoutes";

function AuthorizedRoute(props) {
  //will do check here

  return (
    <Route path={props.path} exact={props.exact}>
      {false ? (
        <props.Component />
      ) : (
        <Redirect to={{ pathname: routes.login.path }} />
      )}
    </Route>
  );
}

export default AuthorizedRoute;
