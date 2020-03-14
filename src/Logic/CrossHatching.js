import BoardPositions from "./BoardPositions";


class CrossHatching {
  constructor() {
    this.sudokuBoard = null;
    this.isNewNumberScratchedOff = false
  }


  //crossHatching: check for rows, columns and boxes and scratch out all options of each field
  // that aren't possible - referred to as "cross-hatching" 
  solve = (sudokuBoard) => {
    console.log("----- Level 1: crossHatching ----");
    this.sudokuBoard = sudokuBoard;
    
    do {
      this.isNewNumberScratchedOff = false;
      
      this.checkRows()
      this.checkColumns()
      this.checkBoxes()
    }
    while (this.isNewNumberScratchedOff);

    return this.sudokuBoard

  };



  checkRows = () => {
    for (let y = 0; y < 9; y++) {
      this.checkRow(y);
    }
  }

  checkColumns = () => {
    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(this.sudokuBoard)

    for (let x = 0; x < 9; x++) {
      this.checkRow(x);
    }

    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(this.sudokuBoard)

  }

  checkBoxes = () => {
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
      return newPossibleNumbersForField
    })

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
        if (fixedNumbers.includes(possibleNumberOfField)) {
          this.isNewNumberScratchedOff = true
          return false
        }
        else
          return true
    })
  }


  isFixedField = (field) => {
    return field.length === 1;
  }



}

export default new CrossHatching();
