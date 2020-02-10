import React, { Component } from 'react'
import Grid3X3 from './Grid3X3'
import Grid from '@material-ui/core/Grid';
import {
    withStyles,
} from "@material-ui/core/styles";

const styles = theme => ({
  grid3x3Item: {
    margin: 10
  },
  
});


class SudokuBoard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  generateBackgroundColorValues = () => {
    return [
      "#5D2E8C", "#2EC4B6", "#F1E8B8", "#CCFF66", "#FF6666", "#B7F0AD", "#D17B0F", "#E8D33F", "#FF99C8"
    ]
  }

  
  render() {
    const {classes} = this.props
    return (

        <Grid container className ={classes.Grid3X3}>      
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => (
            <Grid key={value} item className = {classes.grid3x3Item}>
              <Grid3X3 
                 backgroundColor = {this.generateBackgroundColorValues()[index]}
              
              />
            </Grid>
          ))}
        </Grid>         
      
    )
  }
}


export default withStyles(styles)(SudokuBoard);
