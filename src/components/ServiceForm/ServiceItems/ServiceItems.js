import React from 'react'
import { Grid, TextField, Paper, Typography, Divider } from '@material-ui/core'

import useStyles from "../../../hooks/FormStyleHook";

const createServiceItems = ({ engineAPI }) =>
  function ServiceItems() {
    const classes = useStyles()
    return (
      <Paper variant="outlined" className={`${classes.paperContainer}`}>
        <Grid
          container
          item
          sm={12}
          direction="column"
          spacing={2}
          className={classes.formWrapper}>
          <Grid item sm={12} className={classes.formTitle}>
            <Typography variant="h5" >Detalhes do serviço</Typography>
          </Grid>
          <Grid container item xs={12} className={classes.formItem}>
            <Divider variant="fullWidth" className={classes.divider} />
          </Grid>
          <Grid
            alignItems="center"
            container
            item
            xs={12}
          >
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
          </Grid>
          <Grid container item xs={12}>
            <Divider variant="fullWidth" className={classes.divider} />
          </Grid>
          <Grid container item xs={12}>
            
          </Grid>
        </Grid>
      </Paper>
    )
  }

function ServiceItem() {
  const classes = useStyles()
  return (
    <Grid
      xs={12}
      spacing={2}
      container
      className={classes.formItem}
    >
      <Grid item xs={12} sm={1}>
        <TextField
          size="small"
          label={"Qtd."}
          variant="outlined"
          fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          size="small"
          label={"Descrição"}
          variant="outlined"
          fullWidth />
      </Grid>
      <Grid container item xs={12} sm={3} spacing={2}>
        <Grid item xs={6}>
          <TextField
            size="small"
            label={"Preço U."}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            defaultValue={95.0}
            label={"Preço Total"}
            variant="outlined"
            disabled
            fullWidth />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          size="small"
          label={"Tipo do Serviço"}
          variant="outlined"
          fullWidth />
      </Grid>
    </Grid>
  )
}


export default createServiceItems({})