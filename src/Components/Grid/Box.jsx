import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import {
    withStyles,
} from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    height: 70,
    width: 70,
    "&:hover": {
					backgroundColor: "white !important",
			}   
  },
});

class Box extends Component {
  render() {
    const {classes, backgroundColor} = this.props
    return (
          
      <Paper className={classes.paper} style={{"backgroundColor": backgroundColor}}

      
      >
        
      </Paper>
    )
  }
}


export default withStyles(styles)(Box);
