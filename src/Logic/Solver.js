

class Solver {
  constructor() {
    this.sudokuBoard = null;
  }


  // each field has 9 possible numbers. The sudoku will be solved by 'scratching' off
  // all numbers that are not possible anymore due to the given numbers.
  // Each 'level' brings a higher degree of logic. The easiest suodkus will already be solved
  // by level 1
  solve = sudokuBoard => {
    console.log("called function solve with ", sudokuBoard);

    const sudokuBoardWithAllPossibleNumbers = this.generateAllPossibleNumbersForSudoku(sudokuBoard)
    console.log("transformed sudoku-array to: ", sudokuBoardWithAllPossibleNumbers);
    this.sudokuBoard = sudokuBoardWithAllPossibleNumbers;

    this.solveLevel1()




  };

  
  generateAllPossibleNumbersForSudoku = (sudokuBoard) => {
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

  //level 1: check for rows, columns and boxes and scratch out all options of each field
  // that aren't possible
  solveLevel1 = () => {
    console.log("Level 1: first check");

    this.checkRows(this.sudokuBoard)
   

  };



  checkRows = sudokuBoard => {

    for (let y = 0; y < 9; y++) {
      this.checkRow(y);
     
    }

  }

  isFixedNumber = (field) => {
    console.log(field, "field")
    return field.length === 1;
  }

  checkRow = y => {
    
    let {sudokuBoard} = this

    for (let x = 0; x < 9; x++) {
        if (this.isFixedNumber(sudokuBoard[y])) continue;
      for (let xRepeated = 0; xRepeated < 9; xRepeated++) {
        console.log(xRepeated, "xRepeated")
        //return only the numbers, that are not already "used" in the row by another number
        sudokuBoard[y][x] = sudokuBoard[y][x].filter(number => {
            if (this.isFixedNumber(sudokuBoard[y][xRepeated]) && !xRepeated !== x) {
              console.log(sudokuBoard[y][xRepeated][0] !== number, "isTrue?")
              console.log(sudokuBoard[y][xRepeated][0], "which nukber?")
              return sudokuBoard[y][xRepeated][0] !== number;
            }
            return false
          })
     
      }
    }


  }
}

export default new Solver();
