import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
