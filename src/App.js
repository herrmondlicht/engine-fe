import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotificationProvider } from "context";
import { HomePage, LoginPage } from "pages";
import { SWRConfig } from "swr";
import { ServiceItemPriceProvider } from "pages/ServicePage/ServiceItemPriceContext";

function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <ServiceItemPriceProvider>
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
      </ServiceItemPriceProvider>
    </SWRConfig>
  );
}

export default App;
