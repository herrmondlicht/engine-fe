import React from "react";
import { Route, useRouteMatch, Switch, useHistory } from "react-router-dom";

import { SideMenu, AuthorizedRoute } from "components";
import { appRoutes } from "appRoutes";
import { storageAPI, STORAGE_KEYS } from "utils";

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
        <div className="w-full h-full md:p-12 md:overflow-auto">
          <Switch>
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
    );
  };
  return HomePage;
};

export default createHomePage({ storageAPI });
