import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function Envelope(props) {
  const classes = useStyles();
  const [planned, setPlanned] = useState(0);
  const [spent] = useState(50);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Typography gutterBottom variant="subtitle1">
                {props.label}
              </Typography>
            </Grid>
            <Grid item xs direction="column" spacing={2}>
              <TextField id="standard-basic" label="Planned" InputLabelProps={{ shrink: true }} onChange={(e) => setPlanned(e.target.value)} />
            </Grid>
            <Grid item xs direction="column" spacing={2}>
              <TextField id="standard-basic" label="Spent" InputLabelProps={{ shrink: true }} value={spent} disabled={true} />
            </Grid>
            <Grid item xs direction="column" spacing={2}>
              <TextField id="standard-basic" label="Remaining" InputLabelProps={{ shrink: true }} value={planned - spent} disabled={true} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
