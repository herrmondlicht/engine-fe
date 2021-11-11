import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotificationProvider } from "context";
import { HomePage, LoginPage } from "pages";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </NotificationProvider>
  );
}

export default App;
