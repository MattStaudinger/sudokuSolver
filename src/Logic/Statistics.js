
class Statistics {

  calculateSolvingProcess = () => {

  }
  
  calculateFoundNumbers = (oldSudokuBoard, newSudokuBoard) => {

    let totalNumbersOld = 0
    let totalPossibleNumbersOld = 0
    let totalFoundNumbersNew = 0
    let totalPossibleNumbersNew = 0

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (this.isFixedField(oldSudokuBoard[y][x]))
            totalNumbersOld++;
          if (this.isFixedField(newSudokuBoard[y][x]))
            totalFoundNumbersNew++;
          
          totalPossibleNumbersOld += oldSudokuBoard[y][x].length
          totalPossibleNumbersNew += newSudokuBoard[y][x].length
        }
    }

    return {
      totalNumbersOld, 
      totalPossibleNumbersOld, 
      totalFoundNumbersNew, 
      totalPossibleNumbersNew
    }

  }

  isFixedField = (field) => {
    return field.length === 1;
  }







}

export default new Statistics();
