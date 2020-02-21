import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withStyles,} from "@material-ui/core/styles";
import Box from './Box'

const styles = theme => ({

});
class Grid3X3 extends Component {






  render() {
    const {backgroundColor, handleInputChange, boxNumber, getInputNameBasedOnCoordinate, sudokuBoard} = this.props
    return (
      <React.Fragment>
        <Grid container spacing={2} justify= "center">
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Box 
                backgroundColor = {backgroundColor}
                inputName = {getInputNameBasedOnCoordinate(`${boxNumber}-0-${value}`)}
                handleInputChange = {handleInputChange}
                sudokuBoard = {sudokuBoard}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justify= "center">
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Box 
                backgroundColor = {backgroundColor}
                inputName = {getInputNameBasedOnCoordinate(`${boxNumber}-1-${value}`)}
                handleInputChange = {handleInputChange}
                sudokuBoard = {sudokuBoard}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justify= "center">
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Box 
                backgroundColor = {backgroundColor}
                inputName = {getInputNameBasedOnCoordinate(`${boxNumber}-2-${value}`)}
                handleInputChange = {handleInputChange}
                sudokuBoard = {sudokuBoard}
              />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Grid3X3);
