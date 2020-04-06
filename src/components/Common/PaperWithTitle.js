
import React from "react"
import {
  Paper,
  Grid,
  Typography,
  Divider,
  Box
} from "@material-ui/core";

import useStyles from "../../hooks/FormStyleHook"

const createPaperWithTitle = () =>
  function PaperWithTitle({ children, title, paperClassNames = [], ...rest }) {
    const classes = useStyles()
    return (
      <Paper variant="outlined" className={[classes.paperContainer, ...paperClassNames].join(" ")}>
        <Grid
          container
          item
          sm={12}
          direction="column"
          className={classes.formWrapper}
        >
          <Grid item sm={12} className={classes.formTitle}>
            <Typography variant="h5" >{title}</Typography>
          </Grid>
          <Grid container item xs={12} className={classes.formItem}>
            <Box mt={2} mb={2} width="100%">
              <Divider variant="fullWidth" />
            </Box>
          </Grid>
          {children}
        </Grid>
      </Paper>
    )
  }


export default createPaperWithTitle()