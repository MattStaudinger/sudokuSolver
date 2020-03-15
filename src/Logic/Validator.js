import BoardPositions from "./BoardPositions";

class Validator {

  validate = sudokuBoard => {

    let validNumbers = this.validateNumbers(sudokuBoard)
    if (!validNumbers.isValid) 
      return {isValid: false, positionOfInvalidNumber: validNumbers.positionOfInvalidNumber};


    let validRows = this.validateRows(sudokuBoard)
    if (!validRows.isValid) 
      return {isValid: false, positionOfInvalidNumber: validRows.positionOfInvalidNumber};

    let validColumns = this.validateColumns(sudokuBoard)
    if (!validColumns.isValid) 
      return {isValid: false, positionOfInvalidNumber: validColumns.positionOfInvalidNumber};

    let validBlocks = this.validateBlocks(sudokuBoard)
    if (!validBlocks.isValid) 
      return {isValid: false, positionOfInvalidNumber: validBlocks.positionOfInvalidNumber};
      
    
    return {isValid: true, positionOfInvalidNumber: null};

  };

  validateNumbers = (sudokuBoard) => {
     for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if ((sudokuBoard[y][x] < 1 || sudokuBoard[y][x] > 9 || isNaN(sudokuBoard[y][x])) && sudokuBoard[y][x] !== "")
            return {isValid: false, positionOfInvalidNumber: `${x+1}-${y + 1}`}
        }
     }
            return {isValid: true, positionOfInvalidNumber: null}
  }


  validateRows = sudokuBoard => {
    const translateCoordinatesToStatePosition = (y,positionOfInvalidNumber) =>  `${positionOfInvalidNumber+1}-${y+1}`
    return this.validateRow(sudokuBoard, translateCoordinatesToStatePosition);
  }

  isNumberMoreThanOnceInArray = (numberToSearchInRow, row) => {
      return row.filter(
        number => number === numberToSearchInRow
      ).length > 1;
  }


  validate1DArray = (array) => {

    for (let pos = 0; pos < 9; pos++) {
      const numberToSearch = array[pos];
      if (!numberToSearch) continue; //if number is 0, then don't compare it
      if (this.isNumberMoreThanOnceInArray(numberToSearch, array)) 
        return {isValid: false, positionOfInvalidNumber: pos}      
    }

    return {isValid: true, positionOfInvalidNumber: null}
   
  };




  validateColumns = (sudokuBoard) => {

    let sudokuBoardSwitchedXAndY = BoardPositions.switchRowToColumnOfBoard(sudokuBoard)
    const translateCoordinatesToStatePosition = (y,positionOfInvalidNumber) =>  `${y+1}-${positionOfInvalidNumber+1}`
    return this.validateRow(sudokuBoardSwitchedXAndY, translateCoordinatesToStatePosition);

  };

  validateRow = (sudokuArray, callbackPositionTranslation) => {

    for (let y = 0; y < 9; y++) {
      const row = sudokuArray[y];
      let {isValid, positionOfInvalidNumber} = this.validate1DArray(row)

      if (!isValid) {
        return {isValid, positionOfInvalidNumber: callbackPositionTranslation(y, positionOfInvalidNumber)};
      }
    }
    return {isValid: true, positionOfInvalidNumber: null};

  }


  validateBlocks = (sudokuBoard) => {

    const translateCoordinatesToStatePosition = (y, positionOfInvalidNumber) =>  {
      const {cordX, cordY} = BoardPositions.translateBlockPositionsToCoordinates(y, positionOfInvalidNumber)
      return `${cordX+1}-${cordY + 1}`
    }

    let sudokuBoardBlockArrays = BoardPositions.switchBoardToBlockArrays(sudokuBoard)
    return this.validateRow(sudokuBoardBlockArrays, translateCoordinatesToStatePosition)

  };

}

export default new Validator();
