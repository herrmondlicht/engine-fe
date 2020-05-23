import React from "react";
import {
  makeStyles,
  Grid,
  Paper,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  isWidthDown,
  withWidth,
  isWidthUp,
} from "@material-ui/core";
import { PersonAdd, List } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sideMenuContainer: {
    height: "100%",
    width: "100%",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
    },
  },
  sideMenu: {
    minHeight: theme.spacing(10),
    padding: `${theme.spacing(2)}px 0`,
    width: `100%`,
  },
}));

function SideMenu() {
  const classes = useStyles();
  const location = useLocation();

  console.log(location);

  return (
    <Grid container direction="column" className={classes.sideMenuContainer}>
      <Paper className={classes.sideMenu}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item container justify="center">
            <IconButton
              width={50}
              component={Link}
              to="/customers/new"
              color={
                location.pathname === "/customers/new" ? "secondary" : "default"
              }
            >
              <PersonAdd />
            </IconButton>
          </Grid>
          <Grid item container justify="center">
            <IconButton
              width={50}
              component={Link}
              to="/customers"
              color={
                location.pathname === "/customers" ? "secondary" : "default"
              }
            >
              <List />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export const createMenu = () => {
  const Menu = ({ width }) => {
    return (
      <>
        {isWidthDown("sm", width) && (
          <BottomNavigation>
            <BottomNavigationAction label="Nova OS" icon={<PersonAdd />} />
            <BottomNavigationAction label="Clientes" icon={<List />} />
            <BottomNavigationAction label="Nova OS" icon={<PersonAdd />} />
          </BottomNavigation>
        )}
        {isWidthUp("md", width) && <SideMenu />}
      </>
    );
  };

  return Menu;
};

export default withWidth()(createMenu());
