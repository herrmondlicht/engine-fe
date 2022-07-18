import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotificationProvider } from "context";
import { HomePage, LoginPage } from "pages";
import { SWRConfig } from "swr";

function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
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
    </SWRConfig>
  );
}

export default App;
