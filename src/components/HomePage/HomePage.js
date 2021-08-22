import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  Route, useRouteMatch, Switch, useHistory,
} from "react-router-dom";

import { SideMenu, AuthorizedRoute } from "components";
import { appRoutes } from "appRoutes";
import { storageAPI, STORAGE_KEYS } from "utils";

const useStyles = makeStyles((theme) => ({
  homePageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mainPage: {
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  menu: {
    [theme.breakpoints.between("md", "xl")]: {
      width: theme.spacing(10),
      flexBasis: theme.spacing(10),
      padding: theme.spacing(1),
      height: "100vh",
    },
  },
  container: {
    height: "100%",
    flex: 1,
    paddingTop: theme.spacing(7),
    paddingRight: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
    overflow: "auto",
  },
}));

export const createHomePage = ({ storageAPI }) => {
  const HomePage = () => {
    const classes = useStyles();
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
        className={classes.homePageContainer}
      >
        <Grid className={classes.mainPage} container>
          <Grid className={classes.menu} item>
            <SideMenu />
          </Grid>
          <Grid className={classes.container} item>
            <Switch>
              {Object.values(routes).map((route) => {
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
          </Grid>
        </Grid>
      </div>
    );
  };
  return HomePage;
};

export default createHomePage({ storageAPI });
