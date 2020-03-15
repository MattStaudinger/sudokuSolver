
import BoardPositions from "./BoardPositions";

class RangeChecking {
  constructor() {
    this.sudokuBoard = null;
    this.isNewNumberScratchedOff = false
  }


  // rangeChecking: When a candidate is possible in a certain block and row/column, 
  // and it is not possible anywhere else in the same block, then it is also not possible 
  // anywhere else in the same row/column
  solve = (sudokuBoard) => {
    console.log("----- Level 2: crossHatching ----");
    
    this.sudokuBoard = sudokuBoard;
    this.checkBlocksForCandidateInCommonColumnOrRow()

    return this.sudokuBoard

  };


  checkBlocksForCandidateInCommonColumnOrRow = () => {

    const sudokuBoardBlockArrays = BoardPositions.switchBoardToBlockArrays(this.sudokuBoard)
    console.log(sudokuBoardBlockArrays, "sudokuBoardBlockArrays")
    return;
    
    let rowsWithEqualCandidates = []; // format: [{row: xy, value: z}]


    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      let rowWithEqualCandidates = this.checkBlockForCandidateInCommonRow(sudokuBoardBlockArrays, blockNumber);
      rowsWithEqualCandidates.push(rowWithEqualCandidates)
    }

    rowsWithEqualCandidates.forEach(rowOfCandidate => {
      this.scratchCandidatesOffRow(rowOfCandidate)
    })

    

  }

  checkBlockForCandidateInCommonRow = (sudokuBoardBlockArrays, blockNumber) => {

    const positionsOfEqualCandidates = this.findAllPositionsOfEqualCandidatesInRow(sudokuBoardBlockArrays[blockNumber]) //gets the positions (index) and the value of the equal candidate
    const rowsWithEqualCandidates = this.getPositionOfEqualCandidatesInCommonRow(positionsOfEqualCandidates)
    const translatedRowsWithEqualCandidates = this.translateRowsByBlockNumber(blockNumber, rowsWithEqualCandidates) //depending on the blocknumber, the row / column will be different
    return translatedRowsWithEqualCandidates;
  
  }

  getPositionOfEqualCandidatesInCommonRowOrColumn = (positionsOfEqualCandidates) => {
    let rowsWithEqualCandidates = []; // format: [{row: xy, value: z}]
    let columnsWithEqualCandidates = [];

    positionsOfEqualCandidates.forEach(positionOfEqualCandidates => {

      rowsWithEqualCandidates.push(this.getPositionOfEqualCandidatesInCommonRow(positionOfEqualCandidates));
      columnsWithEqualCandidates.push(this.getPositionOfEqualCandidatesInCommonColumn(positionOfEqualCandidates));

    })

    return {rowsWithEqualCandidates, columnsWithEqualCandidates}
  }


  scratchCandidatesOffRow = (rowOfCandidate) => {

    const {row, value} = rowOfCandidate

    this.sudokuBoard = this.sudokuBoard.filter(rowOfBoard => {
      if (rowOfBoard === row && rowOfBoard.includes(value)) return false
      else return true;
    })
    
  }



  isFixedField = (field) => {
    return field.length === 1;
  }



}

export default new RangeChecking();
