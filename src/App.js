import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CombinedFormsProvider } from "context";
import { NotificationProvider } from "context/NotificationContext";
import { HomePage, LoginPage } from "pages";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/">
              <CombinedFormsProvider value={{}}>
                <HomePage />
              </CombinedFormsProvider>
            </Route>
          </Switch>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
