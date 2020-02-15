import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

function App() {
  // const { login, home } = appRoutes;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="login" exact={true}>
          <Login />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;
