import React, { Component } from "react";
import SudokuBoard from "./Grid/SudokuBoard";
import Button from "./Grid/SudokuButton";
import { withStyles } from "@material-ui/core/styles";
import SudokuPresets from "../sudokuPresets";
import Validator from "../Logic/Validator";
import Solver from "../Logic/Solver";
import BoardPositions from "../Logic/BoardPositions";

const styles = (theme) => ({
  boardSize: {
    width: 800,
    height: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
    marginTop: "40px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  button: {
    margin: "0 20px",
  },
  errorText: {
    textAlign: "center",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "red",
  },
  solvedText: {
    textAlign: "center",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "green",
  },
  header: {
    marginTop: "60px",
    textAlign: "center",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  subHeader: {
    textAlign: "center",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
});

class Sudoku extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sudokuBoard: null,
      invalidInput: "",
      solvedMessage: "",
    };
  }

  updateSudokuBoard(suokuArray) {
    let sudokuBoard = BoardPositions.translateSudokuArrayToStateObject(
      suokuArray
    );
    this.setState({ sudokuBoard });
  }

  resetSudoku = () => {
    this.setState({
      invalidInput: "",
      solvedMessage: "",
    });
    this.updateSudokuBoard(SudokuPresets.reset);
  };

  componentDidMount() {
    this.updateSudokuBoard(SudokuPresets.reset);
  }

  solveSodoku = () => {
    const sudokuArray = BoardPositions.translateSudokuStateObjectToArray(
      this.state.sudokuBoard
    );

    let { isValid, positionOfInvalidNumber } = Validator.validate(sudokuArray);
    if (!isValid) {
      this.setState({
        invalidInput: `p${positionOfInvalidNumber[0] + 1}-${
          positionOfInvalidNumber[1] + 1
        }`,
      });
      // alert(`invalid number in row ${positionOfInvalidNumber}`);
      return;
    }
    let { sudokuSolved, statisticsOfSolving } = Solver.solve(sudokuArray);
    let solvedMessage = "";

    if (statisticsOfSolving.totalFoundNumbersNew === 81)
      solvedMessage = "Sudoku solved";
    else {
      const foundNumbersDiff =
        statisticsOfSolving.totalFoundNumbersNew -
        statisticsOfSolving.totalNumbersOld;
      console.log(foundNumbersDiff);
      solvedMessage = `${foundNumbersDiff} new numbers found`;
    }

    this.setState({ solvedMessage });
    this.updateSudokuBoard(sudokuSolved);

    console.log(`amount of found numbers in given sudoku / solved sudoku: ${statisticsOfSolving.totalNumbersOld} / ${statisticsOfSolving.totalFoundNumbersNew} \n
    amount of candidates in given sudoku / solved sudoku: ${statisticsOfSolving.totalPossibleNumbersOld} / ${statisticsOfSolving.totalPossibleNumbersNew}`);
  };

  getInputNameBasedOnCoordinate = (positionRAW) => {
    const { cordX, cordY } = BoardPositions.translateRAWPositionToCoordinates(
      positionRAW
    );
    const inputName = `p${cordX}-${cordY}`;
    return inputName;
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    let sudokuBoardNew = { ...this.state.sudokuBoard, [name]: value };
    this.setState({
      sudokuBoard: sudokuBoardNew,
      invalidInput: "",
    });
  };

  handleSudokuArrayMaker = (event) => {};

  render() {
    const { classes } = this.props;
    const { sudokuBoard, invalidInput, solvedMessage } = this.state;
    return (
      <div>
        <div>
          <h1 className={classes.header}>Sudoku-Solver</h1>
          <h3 className={classes.subHeader}>
            Enter the numbers of your Sudoku-puzzle
          </h3>
        </div>
        <div className={classes.boardSize}>
          <SudokuBoard
            sudokuBoard={sudokuBoard}
            invalidInput={invalidInput}
            handleInputChange={this.handleInputChange}
            getInputNameBasedOnCoordinate={this.getInputNameBasedOnCoordinate}
          />
        </div>
        {invalidInput && (
          <div>
            <p className={classes.errorText}>
              Invalid input. Please change the value in the marked field
            </p>
          </div>
        )}
        {solvedMessage && (
          <div>
            <p className={classes.solvedText}>{solvedMessage}</p>
          </div>
        )}
        <div className={classes.buttonWrapper}>
          <div className={classes.button}>
            <Button onClick={this.solveSodoku} title="Solve" />
          </div>
          <div className={classes.button}>
            <Button onClick={this.resetSudoku} title="Reset" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sudoku);
