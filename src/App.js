import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./appRoutes";
import AuthorizedRoute from "./components/AuthorizedRoute";

function App() {
  return (
    <Router>
      <Switch>
        {Object.values(routes).map(route => {
          if (route.isLocked) return <AuthorizedRoute {...route} />;
          else
            return (
              <Route
                exact={console.log(route.exact) || route.exact}
                path={route.path}
              >
                <route.Component />
              </Route>
            );
        })}
      </Switch>
    </Router>
  );
}

export default App;
