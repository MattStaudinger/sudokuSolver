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


  getXCoordinate = (grid, box) => {

    switch(grid) {
      case 1:
      case 4:
      case 7:
        return box

      case 2:
      case 5:
      case 8:
        return 3 + box

      case 3:
      case 6:
      case 9:
        return 6 + box

      default:
        throw new Error("grid-value is out of range")
  
    }
  }

  getYCoordinate = (grid, row) => {


    switch(grid) {
      case 1:
      case 2:
      case 3:
        return row

      case 4:
      case 5:
      case 6:
        return 3 + row

      case 7:
      case 8:
      case 9:
        return 6 + row

      default:
        throw new Error("grid-value is out of range")
  
    }
  }
  
  
  encodePositionToCoordinates = (positionRAW) => {
    try {

      const positionSplit = positionRAW.split("-");

      const grid = Number(positionSplit[0])+1;
      const row = Number(positionSplit[1])+1;
      const box = Number(positionSplit[2])+1;
      
      const cordX = this.getXCoordinate(grid, box)
      const cordY = this.getYCoordinate(grid, row)
      return [cordX, cordY]


    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }
  }
  

  handleInputChange = (event) => {
    const {name: positionRAW} = event.target
    const cordinates = this.encodePositionToCoordinates(positionRAW)
    console.log(cordinates, "cordinates")
  }

  
  render() {
    const {classes} = this.props
    return (

        <Grid container className ={classes.Grid3X3}>      
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
            <Grid key={value} item className = {classes.grid3x3Item}>
              <Grid3X3 
                 backgroundColor = {this.generateBackgroundColorValues()[value]}
                 BoxNumber = {value}
                 handleInputChange = {this.handleInputChange}
              />
            </Grid>
          ))}
        </Grid>         
      
    )
  }
}


export default withStyles(styles)(SudokuBoard);
