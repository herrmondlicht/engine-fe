import React, { useState } from "react";
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
import { NoteAdd } from "@material-ui/icons";
import { Link } from "react-router-dom";

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

function SideMenu({ setSelectedItem, selectedItem }) {
  const classes = useStyles();

  const changeSelectedItem = (name) => () => setSelectedItem(name);

  return (
    <Grid container direction="column" className={classes.sideMenuContainer}>
      <Paper className={classes.sideMenu}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item container justify="center">
            <IconButton
              aria-label="delete"
              width={50}
              component={Link}
              to="/customers/new"
              onClick={changeSelectedItem("newCustomer")}
              color={selectedItem === "newCustomer" ? "secondary" : "default"}
            >
              <NoteAdd />
            </IconButton>
          </Grid>
          <Grid item container justify="center">
            <IconButton
              aria-label="delete"
              width={50}
              component={Link}
              to="/customers"
              onClick={changeSelectedItem("new-service2")}
              color={selectedItem === "new-service2" ? "secondary" : "default"}
            >
              <NoteAdd />
            </IconButton>
          </Grid>
          <Grid item container justify="center">
            <IconButton
              aria-label="delete"
              width={50}
              component={Link}
              to="/customers/1"
              onClick={changeSelectedItem("new-service3")}
              color={selectedItem === "new-service3" ? "secondary" : "default"}
            >
              <NoteAdd />
            </IconButton>
          </Grid>
          <Grid item container justify="center">
            <IconButton
              aria-label="delete"
              width={50}
              component={Link}
              to="/services/null/new"
              onClick={changeSelectedItem("new-service3")}
              color={selectedItem === "new-service3" ? "secondary" : "default"}
            >
              <NoteAdd />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export const createMenu = () => {
  const Menu = ({ width }) => {
    const [selectedItem, setSelectedItem] = useState();
    return (
      <>
        {isWidthDown("sm", width) && (
          <BottomNavigation
            value={selectedItem}
            onChange={(event, newValue) => {
              setSelectedItem(newValue);
            }}
          >
            <BottomNavigationAction label="Nova OS" icon={<NoteAdd />} />
            <BottomNavigationAction label="Nova OS" icon={<NoteAdd />} />
            <BottomNavigationAction label="Nova OS" icon={<NoteAdd />} />
          </BottomNavigation>
        )}
        {isWidthUp("md", width) && (
          <SideMenu
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </>
    );
  };

  return Menu;
};

export default withWidth()(createMenu());
