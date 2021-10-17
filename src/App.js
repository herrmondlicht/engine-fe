import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CombinedFormsProvider } from "context";
import { NotificationProvider } from "context/NotificationContext";
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
            <CombinedFormsProvider value={{}}>
              <HomePage />
            </CombinedFormsProvider>
          </Route>
        </Switch>
      </Router>
    </NotificationProvider>
  );
}

export default App;
