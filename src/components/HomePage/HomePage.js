import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

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
      width: 50,
      flexBasis: 50,
      height: "100vh"
    },
    [theme.breakpoints.between("xs", "md")]: {
      width: "100vw",
      height: 50
    }
  },
  container: {
    flex: 1,
    margin: `${theme.spacing(7)}px ${theme.spacing(7)}px ${theme.spacing(
      1
    )}px ${theme.spacing(7)}px`
  }
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div data-testid="HomePageContainer" className={classes.homePageContainer}>
      <Grid className={classes.mainPage} container wrap>
        <Grid
          className={classes.leftMenu}
          item
          style={{ background: "#FFF000" }}
        ></Grid>
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

export default HomePage;
