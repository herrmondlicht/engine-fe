import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CombinedFormsProvider } from "context";
import { NotificationProvider } from "context/NotificationContext";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <Router>
          <Switch>
            <Route path="/login" exact>
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
