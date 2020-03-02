import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formWrapper: {
    padding: theme.spacing(2)
  },
  paperContainer: {
    minHeight: 200,
    margin: theme.spacing(2),
  },
  formItem:{
    marginTop: theme.spacing(2)
  }
}));


export default useStyles