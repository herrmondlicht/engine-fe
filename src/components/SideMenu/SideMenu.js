import React from "react";
import { makeStyles, Grid, Paper, IconButton } from "@material-ui/core";
import { NoteAdd } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  sideMenuContainer: {
    height: "100%",
    width: "100%",
    position: "relative"
  },
  sideMenu: {
    minHeight: theme.spacing(10),
    width: `100%`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center"
  }
}));

export const createSideMenu = () => {
  const SideMenu = () => {
    const classes = useStyles();
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.sideMenuContainer}
      >
        <Paper className={classes.sideMenu}>
          <Grid item container justify="center">
            <IconButton
              aria-label="delete"
              width={50}
              component={Link}
              to="/addnewcar"
            >
              <NoteAdd />
            </IconButton>
          </Grid>
        </Paper>
      </Grid>
    );
  };

  return SideMenu;
};

export default createSideMenu();
