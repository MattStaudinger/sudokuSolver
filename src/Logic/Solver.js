import Statistics from "./Statistics";
import CrossHatching from "./CrossHatching";
import RangeChecking from "./RangeChecking";

class Solver {
  constructor() {
    this.sudokuBoard = null;
  }


  // each field has 9 possible numbers. The sudoku will be solved by 'scratching' off
  // all numbers that are not possible anymore due to the given numbers.
  // Each 'level' brings a higher degree of logic. The easiest suodkus will already be solved
  // at level 1
  solve = sudokuBoard => {
    console.log("called function solve with ", sudokuBoard);
    const sudokuBoardWithAllPossibleNumbers = this.generateAllPossibleNumbersForFields(sudokuBoard)
    this.sudokuBoard = {...sudokuBoardWithAllPossibleNumbers};

    // there are mutliple steps (depending on the difficulty of a sudoku) to solve a sudoku. Starting from the easiest method to the more advanced.
    // All methods are explained here: https://www.stolaf.edu/people/hansonr/sudoku/explain.htm

    this.sudokuBoard = CrossHatching.solve(this.sudokuBoard)
    this.sudokuBoard = RangeChecking.solve(this.sudokuBoard)

    console.log(this.sudokuBoard, "solvedBoard with possible numbers")
    const sudokuSolved = this.translateSudokuWithAllPossibleNumbersBackToNormalArray()
    
    const statisticsOfSolving = Statistics.calculateFoundNumbers(sudokuBoardWithAllPossibleNumbers, this.sudokuBoard)
    return {sudokuSolved, statisticsOfSolving}

  };

  
  generateAllPossibleNumbersForFields = (sudokuBoard) => {
    // if number in field is already in use, then don't add any 
    // other possibilities to it, else add all numbers
     for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (!sudokuBoard[y][x])
            sudokuBoard[y][x] = [1,2,3,4,5,6,7,8,9]
          else
            sudokuBoard[y][x] = [sudokuBoard[y][x]]
          }
     }
     return sudokuBoard;
  }

  translateSudokuWithAllPossibleNumbersBackToNormalArray = () => {

    let newSudokuBoard = [];

    for (let y = 0; y < 9; y++) {
      newSudokuBoard[y] = []
        for (let x = 0; x < 9; x++) {
          if (this.isFixedField(this.sudokuBoard[y][x]))
            newSudokuBoard[y][x] = this.sudokuBoard[y][x][0];
          else 
            newSudokuBoard[y][x] = ""
        }
    }
    return newSudokuBoard;
  }

  isFixedField = (field) => {
    return field.length === 1;
  }





  


}

export default new Solver();
