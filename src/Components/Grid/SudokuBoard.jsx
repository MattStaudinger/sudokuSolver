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
       sudokuBoard: null

    }
  }

  componentDidMount() {
    
    const sudokuBoard = this.generateSudokuStates()
    this.setState({
      sudokuBoard
    })
  }



  generateSudokuStates = () => {

    let sudokuBoard = {}

    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 9; y++) {
        sudokuBoard[`p${x}_${y}`] = 0
      }
    }

    console.log(sudokuBoard, "sudokuBoard")

    return sudokuBoard;
          



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


  
  
  translateRAWPositionToCoordinates = (positionRAW) => {
    try {


      const positionSplit = positionRAW.split("-");

      const grid = Number(positionSplit[0])+1;
      const row = Number(positionSplit[1])+1;
      const box = Number(positionSplit[2])+1;
      
      const cordX = this.getXCoordinate(grid, box)
      const cordY = this.getYCoordinate(grid, row)

      return {cordX, cordY};
    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }
  }

  getInputNameBasedOnCoordinate = (positionRAW) => {

    const {cordX, cordY} = this.translateRAWPositionToCoordinates(positionRAW)
    const inputName = `p${cordX}_${cordY}`;
    console.log(inputName, "inputName")
    return inputName;
  }
  

  handleInputChange = (event) => {
    const {name, value} = event.target
    console.log(name, value, "name, value,")

    let sudokuBoardNew = {...this.state.sudokuBoard, name: value};
    console.log(sudokuBoardNew, "sudokuBoardNew")
    this.setState({
      sudokuBoard: sudokuBoardNew
    })

  }


  setCoordinateToSudokuArray = (coordinate) => {

    let sudokuBoard = this.state.sudokuBoard


  }

  
  render() {
    const {classes} = this.props
    const {sudokuBoard} = this.state
    return (

        <Grid container className ={classes.Grid3X3}> 
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((boxNumber) => (
            <Grid key={boxNumber} item className = {classes.grid3x3Item}>
              <Grid3X3 
                 backgroundColor = {this.generateBackgroundColorValues()[boxNumber]}
                 boxNumber = {boxNumber}
                 handleInputChange = {this.handleInputChange}
                 getInputNameBasedOnCoordinate = {this.getInputNameBasedOnCoordinate}
                 sudokuBoard = {sudokuBoard}
              />
            </Grid>
          ))}
          )
        </Grid>         
      
    )
  }
}


export default withStyles(styles)(SudokuBoard);
