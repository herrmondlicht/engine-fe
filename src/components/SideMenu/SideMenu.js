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
import { PersonAdd, List, ExitToApp } from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import storageAPI, { STORAGE_KEYS } from "../../utils/storage/storageAPI";

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

function SideMenu({ storageAPI }) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

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
                location.pathname === "/customers/new" ? "primary" : "default"
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
                location.pathname === "/customers" ? "primary" : "default"
              }
            >
              <List />
            </IconButton>
          </Grid>
          <Grid item container justify="center">
            <IconButton
              color="secondary"
              title={"Sair"}
              width={50}
              onClick={() => {
                storageAPI.removeItem(STORAGE_KEYS.TOKEN);
                history.replace("/login");
              }}
            >
              <ExitToApp />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export const createMenu = ({ storageAPI }) => {
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
        {isWidthUp("md", width) && <SideMenu storageAPI={storageAPI} />}
      </>
    );
  };

  return Menu;
};

export default withWidth()(createMenu({ storageAPI }));
