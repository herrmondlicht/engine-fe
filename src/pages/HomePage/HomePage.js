import React from "react";
import {
  Route,
  useRouteMatch,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";

import { SideMenu, AuthorizedRoute } from "components";
import { appRoutes } from "appRoutes";
import { storageAPI, STORAGE_KEYS } from "utils";
import HeaderImplementation from "./HeaderImplementation";

export const createHomePage = ({ storageAPI }) => {
  const HomePage = () => {
    const match = useRouteMatch();
    // eslint-disable-next-line no-unused-vars
    const { login, home, ...routes } = appRoutes;
    const token = storageAPI.getItem(STORAGE_KEYS.TOKEN);
    const history = useHistory();

    if (!token) {
      history.replace("/login");
    }

    return (
      <div
        data-testid="HomePageContainer"
        className="flex flex-col-reverse w-full h-full md:flex-row"
      >
        <SideMenu />
        <div className="w-full h-full md:pb-6 md:overflow-auto relative">
          <div
            className="w-full sticky top-0 z-20 px-2 md:px-10"
            style={{ height: "70px" }}
          >
            <HeaderImplementation />
          </div>
          <div className="mt-14 md:mt-10 px-2 md:px-10">
            <Switch>
              <Route exact path="/">
                <Redirect to="/customers" />
              </Route>
              {Object.values(routes).map(route => {
                if (route.isLocked) {
                  return (
                    <AuthorizedRoute
                      key={route.name}
                      {...route}
                      path={`${match.path}${route.path}`}
                    />
                  );
                }
                return (
                  <Route
                    exact={route.exact}
                    key={route.name}
                    path={`${match.path}${route.path}`}
                  >
                    <route.Component />
                  </Route>
                );
              })}
            </Switch>
          </div>
        </div>
      </div>
    );
  };
  return HomePage;
};

export default createHomePage({ storageAPI });
