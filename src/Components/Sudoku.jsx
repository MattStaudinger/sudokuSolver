import React, { Component } from "react";
import SudokuBoard from "./Grid/SudokuBoard";
import SolveSudokuButton from "./Grid/SolveSudokuButton";
import { withStyles } from "@material-ui/core/styles";
import sudokuPresets from "../sudokuPresets";
import Validator from "../Logic/Validator";
import BoardPositions from "./boardPositions";

const styles = theme => ({
  boardSize: {
    width: 800,
    height: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
    marginTop: "80px"
  },
  button: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px"
  }
});

class Sudoku extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sudokuBoard: null
    };
  }

  componentDidMount() {
    let sudokuBoard = BoardPositions.translateSudokuArrayToStateObject(
      sudokuPresets.defaultPreset
    );
    this.setState({ sudokuBoard });
  }

  solveSodoku = () => {

    const sudokuArray = BoardPositions.translateSudokuStateObjectToArray(this.state.sudokuBoard);
    let {isValid, positionOfInvalidNumber} = Validator.validate(sudokuArray);
    if (!isValid) {
      alert(`invalid number in row ${positionOfInvalidNumber}`)
    }

    // let solvedBoard = sudokuSolver.solve(this.state.sudokuBoard);

    // this.setState({
    //   sudokuBoard: solvedBoard
    // });
  };

  getInputNameBasedOnCoordinate = positionRAW => {
    const { cordX, cordY } = BoardPositions.translateRAWPositionToCoordinates(
      positionRAW
    );
    const inputName = `p${cordX}-${cordY}`;
    return inputName;
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    let sudokuBoardNew = { ...this.state.sudokuBoard, [name]: value };
    this.setState({
      sudokuBoard: sudokuBoardNew
    });
  };

  render() {
    const { classes } = this.props;
    const { sudokuBoard } = this.state;
    return (
      <div>
        <div className={classes.boardSize}>
          <SudokuBoard
            sudokuBoard={sudokuBoard}
            handleInputChange={this.handleInputChange}
            getInputNameBasedOnCoordinate={this.getInputNameBasedOnCoordinate}
          />
        </div>
        <div className={classes.button}>
          <SolveSudokuButton
            solveSodoku={this.solveSodoku}
            className={classes.buttonSolve}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sudoku);
