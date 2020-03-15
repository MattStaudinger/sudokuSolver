
class BoardPositions {


  getXCoordinate = (grid, block) => {

    switch(grid) {
      case 1:
      case 4:
      case 7:
        return block

      case 2:
      case 5:
      case 8:
        return 3 + block

      case 3:
      case 6:
      case 9:
        return 6 + block

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
      const block = Number(positionSplit[2])+1;
      
      const cordX = this.getXCoordinate(grid, block)
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

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (sudokuArray[y][x] === 0) sudokuArray[y][x] = "";          
          sudokuState[`p${x + 1}-${y + 1}`] = sudokuArray[y][x]
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
          sudokuArray[y][x] = ""
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


  translateBlockPositionsToCoordinates = (blockIndex, positionOfNumber) => {
    //blockIndex goes from left top to right bottom from 0 to 8, positionOfNumber in the same manner

    const {cordX, cordY} = this.getCoordinatesOfBlock(positionOfNumber)

    switch (blockIndex) {
      case 0:
        return {cordX, cordY}
      case 1:
        return {cordX: cordX + 3, cordY}
      case 2:
        return {cordX: cordX + 6, cordY}
      case 3:
        return {cordX, cordY: cordY + 3}
      case 4:
        return {cordX: cordX + 3, cordY: cordY + 3}
      case 5:
        return {cordX: cordX + 6, cordY: cordY +3}
      case 6:
        return {cordX, cordY: cordY + 6}
      case 7:
        return {cordX: cordX + 3, cordY: cordY + 6}
      case 8:
        return {cordX: cordX + 6, cordY: cordY + 6}
      default:
        return new Error("position of blocks out of reach")
    
    }
  }



  getCoordinatesOfBlock = (positionInBlock) => {
    switch (positionInBlock) {
      case 0:
      case 1:
      case 2:
        return {cordX: positionInBlock, cordY: 0} 
      case 3:
      case 4:
      case 5:
        return {cordX: positionInBlock - 3, cordY: 1} 
      case 6:
      case 7:
      case 8:
        return {cordX: positionInBlock - 6, cordY: 2}
      default:
        return new Error("position of block out of reach")
    }
  }

  switchRowToColumnOfBoard = sudokuBoard => {
    let sudokuBoardSwitchedXAndY = [];

    for (let x = 0; x < 9; x++) {
      sudokuBoardSwitchedXAndY[x] = []
      for (let y = 0; y < 9; y++) {       
        sudokuBoardSwitchedXAndY[x][y] = sudokuBoard[y][x]
      }
    }
    return sudokuBoardSwitchedXAndY;

  }


  switchBoardToBlockArrays = (sudokuBoard) => {

    let sudokuBoardArrayBlocks = []

    for (let z = 0; z<9; z++) {
      sudokuBoardArrayBlocks[z] = []
    }
    
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) { 
     
        if (x < 3 && y < 3)
          sudokuBoardArrayBlocks[0].push(sudokuBoard[y][x])        
        else if (x >= 3 && x < 6 && y < 3) 
          sudokuBoardArrayBlocks[1].push(sudokuBoard[y][x])        
        else if (x >= 6 && y < 3)
          sudokuBoardArrayBlocks[2].push(sudokuBoard[y][x])
        else if (x < 3 && y >=3 && y < 6)
          sudokuBoardArrayBlocks[3].push(sudokuBoard[y][x])
        else if (x >=3 && x< 6 && y >=3 && y < 6)
          sudokuBoardArrayBlocks[4].push(sudokuBoard[y][x])
        else if (x >= 6 && y >=3 && y < 6)
          sudokuBoardArrayBlocks[5].push(sudokuBoard[y][x])
        else if (x < 3 && y >= 6)
          sudokuBoardArrayBlocks[6].push(sudokuBoard[y][x])
        else if (x >=3 && x< 6 && y >= 6)
          sudokuBoardArrayBlocks[7].push(sudokuBoard[y][x])
        else if (x >= 6 && y >= 6)
          sudokuBoardArrayBlocks[8].push(sudokuBoard[y][x])  
      }
    }
    return sudokuBoardArrayBlocks;
  }



}


export default new BoardPositions();
