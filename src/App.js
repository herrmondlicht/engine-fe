import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./utils/appRoutes";
import AuthorizedRoute from "./components/AuthorizedRoute";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {Object.values(routes).map(route => {
            if (route.isLocked)
              return <AuthorizedRoute key={route.name} {...route} />;
            else
              return (
                <Route exact={route.exact} key={route.name} path={route.path}>
                  <route.Component />
                </Route>
              );
          })}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
