import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({  
  buttonSolve: {
    color: "white",
    backgroundColor: "#606060"
  }  
});



class SolveSudokuButton extends Component {
  render() {
    const {classes, solveSodoku} = this.props
    return (
      <Button
          onClick = {solveSodoku}
          variant = "contained"
          className={classes.buttonSolve}
        >
          Solve Sudoku
      </Button>
    )
  }
}


export default withStyles(styles)(SolveSudokuButton);
