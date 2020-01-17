import React, { Component } from 'react'
import Grid3X3 from './Grid/Grid3X3'
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import {
    withStyles,
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";

const styles = theme => ({
   root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  }, 
});


class Sudoku extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  
  render() {
    const {classes} = this.props
    return (
      <div>

        <Grid container className={classes.root} spacing={2}>


          <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>

        </Grid>

        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
        <Grid3X3 />
      </div>
    )
  }
}


export default withStyles(styles)(Sudoku);
