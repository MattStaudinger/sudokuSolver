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

  generateBackgroundColorValues = () => {
    return [
      "#5D2E8C", "#2EC4B6", "#F1E8B8", "#CCFF66", "#FF6666", "#B7F0AD", "#D17B0F", "#E8D33F", "#FF99C8"
    ]
  }

  render() {
    const {classes, sudokuBoard, handleInputChange, getInputNameBasedOnCoordinate} = this.props
    return (

        <Grid container className ={classes.Grid3X3}> 
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((boxNumber) => (
            <Grid key={boxNumber} item className = {classes.grid3x3Item}>
              <Grid3X3 
                 backgroundColor = {this.generateBackgroundColorValues()[boxNumber]}
                 boxNumber = {boxNumber}
                 handleInputChange = {handleInputChange}
                 getInputNameBasedOnCoordinate = {getInputNameBasedOnCoordinate}
                 sudokuBoard = {sudokuBoard}
              />
            </Grid>
            ))
          }          
        </Grid>         
      
    )
  }
}


export default withStyles(styles)(SudokuBoard);
