import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SideMenu from "../SideMenu/SideMenu";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import appRoutes from "../../utils/appRoutes";
import AuthorizedRoute from "../AuthorizedRoute";

const useStyles = makeStyles(theme => ({
  homePageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mainPage: {
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse"
    }
  },
  menu: {
    [theme.breakpoints.between("md", "xl")]: {
      width: theme.spacing(10),
      flexBasis: theme.spacing(10),
      padding: theme.spacing(1),
      height: "100vh"
    },
  },
  container: {
    flex: 1,
    margin: `${theme.spacing(7)}px ${theme.spacing(7)}px ${theme.spacing(
      1
    )}px ${theme.spacing(7)}px`,
    [theme.breakpoints.down("sm")]: {
      margin: 0
    },
    overflow: "auto"
  }
}));

export const createHomePage = () => {
  const HomePage = () => {
    const classes = useStyles();
    const match = useRouteMatch();
    const { login, home, ...routes } = appRoutes;
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
              {Object.values(routes).map(route => {
                if (route.isLocked)
                  return (
                    <AuthorizedRoute
                      key={route.name}
                      {...route}
                      path={`${match.path}${route.path}`}
                    />
                  );
                else
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

export default createHomePage();
