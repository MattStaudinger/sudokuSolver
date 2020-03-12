import BoardPositions from "../Components/boardPositions";

class Validator {

  validate = sudokuBoard => {

    let validNumbers = this.validNumbers(sudokuBoard)
    if (!validNumbers.isValid) 
      return {isValid: false, positionOfInvalidNumber: validNumbers.positionOfInvalidNumber};


    let validRows = this.validateRows(sudokuBoard)
    if (!validRows.isValid) 
      return {isValid: false, positionOfInvalidNumber: validRows.positionOfInvalidNumber};

    let validColumns = this.validateColumns(sudokuBoard)
    if (!validColumns.isValid) 
      return {isValid: false, positionOfInvalidNumber: validColumns.positionOfInvalidNumber};

    let validBoxes = this.validateBoxes(sudokuBoard)
    if (!validBoxes.isValid) 
      return {isValid: false, positionOfInvalidNumber: validBoxes.positionOfInvalidNumber};
      
    
    return {isValid: true, positionOfInvalidNumber: null};

  };

  validNumbers = (sudokuBoard) => {
     for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (sudokuBoard[y][x] < 0 || sudokuBoard[y][x] > 9)
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


  validateBoxes = (sudokuBoard) => {

    const translateCoordinatesToStatePosition = (y, positionOfInvalidNumber) =>  {
      const {cordX, cordY} = BoardPositions.translateBoxPositionsToCoordinates(y, positionOfInvalidNumber)
      return `${cordX+1}-${cordY + 1}`
    }

    let sudokuBoardBoxArrays = BoardPositions.switchBoardToBoxArrays(sudokuBoard)
    return this.validateRow(sudokuBoardBoxArrays, translateCoordinatesToStatePosition)

  };

}

export default new Validator();
