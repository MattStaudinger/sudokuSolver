

class Validator {

  validate = sudokuBoard => {
    let {isValid, positionOfInvalidNumber} = this.validateRows(sudokuBoard)

    return {isValid, positionOfInvalidNumber};
  };


  validateRows = sudokuBoard => {

    for (let y = 0; y < 9; y++) {
      const row = sudokuBoard[y];
      let {isValid, positionOfInvalidNumber} = this.validateSingleRow(row)      
      if (!isValid) 
        return {isValid, positionOfInvalidNumber: `${positionOfInvalidNumber+1}-${y+1}`};
    }

    return {isValid: true, positionOfInvalidNumber: null};

  }

  isNumberMoreThanOnceInArray = (numberToSearchInRow, row) => {
      return row.filter(
        number => number === numberToSearchInRow
      ).length > 1;
  }


  validateSingleRow = (row) => {

    for (let x = 0; x < 9; x++) {
      const numberToSearchInRow = row[x];
      if (!numberToSearchInRow) continue; //if number is 0, then don't compare it
      if (this.isNumberMoreThanOnceInArray(numberToSearchInRow, row)) 
        return {isValid: false, positionOfInvalidNumber: x}      
    }

    return {isValid: true, positionOfInvalidNumber: null}
   
  };


  validateColumn = (field, sudokuBoard) => {};

  validateBox = (field, sudokuBoard) => {};

}

export default new Validator();
