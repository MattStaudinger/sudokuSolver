

class Validator {

  validate = sudokuBoard => {

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


  validateRows = sudokuBoard => {

    for (let y = 0; y < 9; y++) {
      const row = sudokuBoard[y];
      let {isValid, positionOfInvalidNumber} = this.validate1DArray(row)      
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


  validate1DArray = (array) => {

    for (let pos = 0; pos < 9; pos++) {
      const numberToSearch = array[pos];
      if (!numberToSearch) continue; //if number is 0, then don't compare it
      if (this.isNumberMoreThanOnceInArray(numberToSearch, array)) 
        return {isValid: false, positionOfInvalidNumber: pos}      
    }

    return {isValid: true, positionOfInvalidNumber: null}
   
  };

  switchXandYOfBoard = sudokuBoard => {
    let sudokuBoardSwitchedXAndY = [];

    for (let x = 0; x < 9; x++) {
      sudokuBoardSwitchedXAndY[x] = []
      for (let y = 0; y < 9; y++) {       
        sudokuBoardSwitchedXAndY[x][y] = sudokuBoard[y][x]
      }
    }
    return sudokuBoardSwitchedXAndY;

  }


  validateColumns = (sudokuBoard) => {

    let sudokuBoardSwitchedXAndY = this.switchXandYOfBoard(sudokuBoard)

    for (let x = 0; x < 9; x++) {
      const column = sudokuBoardSwitchedXAndY[x];
      let {isValid, positionOfInvalidNumber} = this.validate1DArray(column)      
      if (!isValid) 
        return {isValid, positionOfInvalidNumber: `${x+1}-${positionOfInvalidNumber+1}`};
    }

    return {isValid: true, positionOfInvalidNumber: null};

  };

  translateBoardToBoxArrays = (sudokuBoard) => {

    let sudokuBoardArrayBoxes = []

    for (let z = 0; z<9; z++) {
      sudokuBoardArrayBoxes[z] = []
    }
    
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) { 
     
        if (x < 3 && y < 3)
          sudokuBoardArrayBoxes[0].push(sudokuBoard[y][x])        
        else if (x >= 3 && x < 6 && y < 3) 
          sudokuBoardArrayBoxes[1].push(sudokuBoard[y][x])        
        else if (x >= 6 && y < 3)
          sudokuBoardArrayBoxes[2].push(sudokuBoard[y][x])
        else if (x < 3 && y >=3 && y < 6)
          sudokuBoardArrayBoxes[3].push(sudokuBoard[y][x])
        else if (x >=3 && x< 6 && y >=3 && y < 6)
          sudokuBoardArrayBoxes[4].push(sudokuBoard[y][x])
        else if (x >= 6 && y >=3 && y < 6)
          sudokuBoardArrayBoxes[5].push(sudokuBoard[y][x])
        else if (x < 3 && y >= 6)
          sudokuBoardArrayBoxes[6].push(sudokuBoard[y][x])
        else if (x >=3 && x< 6 && y >= 6)
          sudokuBoardArrayBoxes[7].push(sudokuBoard[y][x])
        else if (x >= 6 && y >= 6)
          sudokuBoardArrayBoxes[8].push(sudokuBoard[y][x])  
      }
    }
    return sudokuBoardArrayBoxes;
  }


  validateBoxes = (sudokuBoard) => {

    let sudokuBoardBoxArrays = this.translateBoardToBoxArrays(sudokuBoard)

    for (let x = 0; x < 9; x++) {
      const box = sudokuBoardBoxArrays[x];
      let {isValid, positionOfInvalidNumber} = this.validate1DArray(box)
      if (!isValid) 
        return {isValid, positionOfInvalidNumber: `${positionOfInvalidNumber+1}-${x}`};
    }

    return {isValid: true, positionOfInvalidNumber: null};

  };

}

export default new Validator();
