import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import { CombinedFormsProvider } from "context";
import { NotificationProvider } from "context/NotificationContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <Router>
          <Switch>
            <Route path="/login" exact={true}>
              <Login />
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
