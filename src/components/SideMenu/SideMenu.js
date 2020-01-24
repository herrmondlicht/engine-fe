import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles, Grid, Paper, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles(theme => ({
  sideMenuContainer: {
    height: "100%",
    width: "100%",
    position: "relative"
  },
  sideMenu: {
    minHeight: theme.spacing(10),
    width: `100%`,
    padding: theme.spacing(1),
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
            <IconButton aria-label="delete" width={50}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Paper>
      </Grid>
    );
  };

  return SideMenu;
};

export default createSideMenu();
