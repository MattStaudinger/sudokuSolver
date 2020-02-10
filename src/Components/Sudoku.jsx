import React, { Component } from 'react'
import SudokuBoard from './Grid/SudokuBoard'
import {withStyles} from "@material-ui/core/styles";



const styles = theme => ({
  boardSize: {
    width: 800,
    height: 800,
       display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto"
    
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
       <div className = {classes.boardSize}>
          <SudokuBoard />
        </div>   
      </div>
    )
  }
}


export default withStyles(styles)(Sudoku);
