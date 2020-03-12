import BoardPositions from "../Components/boardPositions";

class Solver {
  constructor() {
    this.sudokuBoard = null;
    this.isNewNumberFound = false
  }


  // each field has 9 possible numbers. The sudoku will be solved by 'scratching' off
  // all numbers that are not possible anymore due to the given numbers.
  // Each 'level' brings a higher degree of logic. The easiest suodkus will already be solved
  // at level 1
  solve = sudokuBoard => {
    console.log("called function solve with ", sudokuBoard);
    const sudokuBoardWithAllPossibleNumbers = this.generateAllPossibleNumbersForFields(sudokuBoard)
    this.sudokuBoard = sudokuBoardWithAllPossibleNumbers;

    this.solveLevel1()

    return this.sudokuBoard;


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

  //level 1: check for rows, columns and boxes and scratch out all options of each field
  // that aren't possible
  solveLevel1 = () => {
    console.log("----- Level 1 ----");

    do {
      this.checkRows()
      this.checkColumns()
      this.checkBoxes()
    }
    while (this.isNewNumberFound);


  };



  checkRows = () => {
    this.isNewNumberFound = false;

    for (let y = 0; y < 9; y++) {
      this.checkRow(y);
    }
  }

  checkColumns = () => {

    this.isNewNumberFound = false;
    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(this.sudokuBoard)

    for (let x = 0; x < 9; x++) {
      this.checkRow(x);
    }

    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(this.sudokuBoard)

  }

  checkBoxes = () => {

    this.isNewNumberFound = false;
    this.sudokuBoard = BoardPositions.switchBoardToBoxArrays(this.sudokuBoard)

    for (let x = 0; x < 9; x++) {
      this.checkRow(x);
    }

    this.sudokuBoard = BoardPositions.switchBoardToBoxArrays(this.sudokuBoard)

  }

  checkRow = y => {    
    let fixedNumbers = this.getAllFixedNumbersOfArray(y);
    this.sudokuBoard[y] = this.sudokuBoard[y].map(x => {

      if (this.isFixedField(x)) return x;
      const newPossibleNumbersForField = this.scratchAllFixedNumbersFromField(x, fixedNumbers)
      if (this.isFixedField(newPossibleNumbersForField)) this.isNewNumberFound = true
      return newPossibleNumbersForField
    })

  }

  isFixedField = (field) => {
    return field.length === 1;
  }

  getAllFixedNumbersOfArray = (y) => {
    const fixedFields = this.sudokuBoard[y].filter(x =>
       this.isFixedField(x)
    )
    const fixedNumbers = fixedFields.map(field => field[0])
    return fixedNumbers;
  }

  scratchAllFixedNumbersFromField = (field, fixedNumbers) => {
      
    return field.filter(possibleNumberOfField => {
        return !fixedNumbers.includes(possibleNumberOfField) 
    })
  }


}

export default new Solver();
