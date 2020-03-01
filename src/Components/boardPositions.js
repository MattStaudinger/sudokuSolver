
class BoardPositions {


  getXCoordinate = (grid, box) => {

    switch(grid) {
      case 1:
      case 4:
      case 7:
        return box

      case 2:
      case 5:
      case 8:
        return 3 + box

      case 3:
      case 6:
      case 9:
        return 6 + box

      default:
        throw new Error("grid-value is out of range")
  
    }
  }

  getYCoordinate = (grid, row) => {


    switch(grid) {
      case 1:
      case 2:
      case 3:
        return row

      case 4:
      case 5:
      case 6:
        return 3 + row

      case 7:
      case 8:
      case 9:
        return 6 + row

      default:
        throw new Error("grid-value is out of range")
  
    }
  }


  
  
  translateRAWPositionToCoordinates = (positionRAW) => {
    try {
      
      const positionSplit = positionRAW.split("-");

      const grid = Number(positionSplit[0])+1;
      const row = Number(positionSplit[1])+1;
      const box = Number(positionSplit[2])+1;
      
      const cordX = this.getXCoordinate(grid, box)
      const cordY = this.getYCoordinate(grid, row)

      return {cordX, cordY};
    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }
  }



  translateSudokuArrayToStateObject = (sudokuArray) => {

    let sudokuState = {}
    let acc = 0;;

    for (let y = 1; y <= 9; y++) {
        for (let x = 1; x <= 9; x++) {
          if (sudokuArray[acc] === 0) sudokuArray[acc] = "";          
          sudokuState[`p${x}-${y}`] = sudokuArray[acc]
          acc++;
        }
    }
    return sudokuState;
  }

  getCoordinatesOfPositionState = (position) => {
    const cordX = position[1] - 1;
    const cordY = position[3] - 1;
    return {cordX, cordY}
  }


  generateEmptySudokuArray = () => {

    let sudokuArray = [];

    for (let y = 0; y < 9; y++) {
      sudokuArray[y] = [];
        for (let x = 0; x < 9; x++) {
          sudokuArray[y][x] = 0
        }
    };

    return sudokuArray;
  }

  translateSudokuStateObjectToArray = (sudokuState) => {

    let sudokuArray = this.generateEmptySudokuArray()

     for (let pos in sudokuState) {
       if (sudokuState[pos]) {
        const {cordX, cordY} = this.getCoordinatesOfPositionState(pos)
        sudokuArray[cordY][cordX] = Number(sudokuState[pos])
       }
    }

    return sudokuArray;
  }


}


export default new BoardPositions();
