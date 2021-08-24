import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formWrapper: {
    padding: theme.spacing(3),
  },
  paperContainer: {
    margin: theme.spacing(2),
  },
  paperContainerTop: {
    marginTop: 0,
  },
  formItem: {
    marginTop: theme.spacing(2),
  },
  buttonSubmit: {
    margin: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    flex: 1,
  },
  formTitle: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  formErrorMessage: {
    color: theme.palette.error.main,
  },
}));

export default useStyles;
