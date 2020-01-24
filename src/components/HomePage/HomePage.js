import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SideMenu from "../SideMenu/SideMenu";

const useStyles = makeStyles(theme => ({
  homePageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  mainPage: {
    height: "100%",
    width: "100%",
    [theme.breakpoints.between("xs", "sm")]: {
      flexDirection: "column-reverse"
    }
  },
  leftMenu: {
    [theme.breakpoints.between("md", "xl")]: {
      width: theme.spacing(10),
      flexBasis: theme.spacing(10),
      padding: theme.spacing(1),
      height: "100vh"
    },
    [theme.breakpoints.between("xs", "md")]: {
      width: "100vw",
      padding: theme.spacing(1),
      height: theme.mixins.toolbar.minHeight
    }
  },
  container: {
    flex: 1,
    margin: `${theme.spacing(7)}px ${theme.spacing(7)}px ${theme.spacing(
      1
    )}px ${theme.spacing(7)}px`
  }
}));

export const createHomePage = () => {
  const HomePage = () => {
    const classes = useStyles();
    return (
      <div
        data-testid="HomePageContainer"
        className={classes.homePageContainer}
      >
        <Grid className={classes.mainPage} container>
          <Grid
            className={classes.leftMenu}
            item
            style={{ background: "#FFF000" }}
          >
            <SideMenu />
          </Grid>
          <Grid
            className={classes.container}
            item
            style={{ background: "#F5f5f5" }}
          >
            testing
          </Grid>
        </Grid>
      </div>
    );
  };
  return HomePage;
};

export default createHomePage();
