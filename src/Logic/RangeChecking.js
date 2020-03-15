import BoardPositions from "./BoardPositions";

class RangeChecking {
  constructor() {
    this.sudokuBoard = null;
    this.isNewNumberScratchedOff = false;
  }

  // rangeChecking: When a candidate is possible in a certain block and row/column,
  // and it is not possible anywhere else in the same block, then it is also not possible
  // anywhere else in the same row/column
  solve = sudokuBoard => {
    console.log("----- Level 2: RangeChecking ----");

    this.sudokuBoard = sudokuBoard;
    this.checkBlocksForCandidateInCommonColumnOrRow();

    return this.sudokuBoard;
  };

  checkBlocksForCandidateInCommonColumnOrRow = () => {
    const sudokuBoardBlockArrays = BoardPositions.switchBoardToBlockArrays(
      this.sudokuBoard
    );
    console.log(sudokuBoardBlockArrays, "sudokuBoardBlockArrays");

    let rowsWithEqualCandidates = []; // format: [{row: xy, value: z}]

    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      let rowWithEqualCandidates = this.checkBlockForCandidateInCommonRow(
        sudokuBoardBlockArrays,
        blockNumber
      );
      rowsWithEqualCandidates.push(rowWithEqualCandidates);
    }
    console.log(rowsWithEqualCandidates, "rowWithEqualCandidates");
    return;
    rowsWithEqualCandidates.forEach(rowOfCandidates => {
      rowOfCandidates.forEach(rowOfCandidate => {
        this.scratchCandidatesOffRow(rowOfCandidate.row, rowOfCandidate.value);
      });
    });

    //same logic for columns
  };

  checkBlockForCandidateInCommonRow = (sudokuBoardBlockArrays, blockNumber) => {
    const positionsOfEqualCandidates = this.findPositionsOfEqualNumbersInArray(
      sudokuBoardBlockArrays[blockNumber]
    ); //gets the positions (index) and the value of the equal candidate

    const rowsWithEqualCandidates = this.getPositionOfEqualNumbersOnlyFoundInSameRow(
      positionsOfEqualCandidates
    );
    console.log(rowsWithEqualCandidates, "rowsWithEqualCandidates");

    const translatedRowsWithEqualCandidates = this.translateRowsByBlockNumber(
      blockNumber,
      rowsWithEqualCandidates
    ); //depending on the blocknumber, the row will be different

    return translatedRowsWithEqualCandidates;
  };

  translateRowsByBlockNumber = (blockNumber, rowsWithEqualCandidates) => {
    const translatedRows = rowsWithEqualCandidates.map(row => {
      switch (blockNumber) {
        case 0:
        case 1:
        case 2:
          return row;
        case 3:
        case 4:
        case 5:
          return { row: row.row + 3, value: row.value };
        case 6:
        case 7:
        case 8:
          return { row: row.row + 6, value: row.value };
        default:
          throw new Error("can't translate row index of block out of range");
      }
    });
    return translatedRows;
  };

  findPositionsOfEqualNumbersInArray = blockArray => {
    let equalNumbers = [];
    for (let candidate = 1; candidate <= 9; candidate++) {
      let equalNumberCounter = { counter: 0, position: [] };

      blockArray.forEach((numberWithCandidates, position) => {
        if (numberWithCandidates.includes(candidate)) {
          equalNumberCounter.counter = equalNumberCounter.counter + 1;
          equalNumberCounter.position = [
            ...equalNumberCounter.position,
            position
          ];
        }
      });
      if (equalNumberCounter.counter > 1)
        equalNumbers.push({
          position: equalNumberCounter.position,
          value: candidate
        });
    }

    return equalNumbers;
  };

  getPositionOfEqualNumbersOnlyFoundInSameRow = positionsOfEqualCandidates => {
    let rowsWithEqualCandidates = []; // format: [{row: xy, value: z}]

    positionsOfEqualCandidates.forEach(positionOfEqualCandidate => {
      const rowWithEqualCandidate = this.findEqualCandidatesOnlyInEqualRow(
        positionOfEqualCandidate
      );
      if (rowWithEqualCandidate)
        rowsWithEqualCandidates.push(rowWithEqualCandidate);
    });

    return rowsWithEqualCandidates;
  };

  findEqualCandidatesOnlyInEqualRow = positionOfEqualCandidate => {
    const validRows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
    let startingRowOfCandidate = validRows.findIndex(row =>
      row.includes(positionOfEqualCandidate.position[0])
    );

    for (
      let positionIndex = 1;
      positionIndex < positionOfEqualCandidate.position.length;
      positionIndex++
    ) {
      if (
        !validRows[startingRowOfCandidate].includes(
          positionOfEqualCandidate.position[positionIndex]
        )
      )
        return null;
    }

    return {
      row: startingRowOfCandidate,
      value: positionOfEqualCandidate.value
    };
  };

  scratchCandidatesOffRow = (row, valueToScratchOff) => {
    console.log(row, valueToScratchOff, "row, value");
    this.sudokuBoard = this.sudokuBoard.map((rowOfBoard, rowIndex) => {
      let x = rowOfBoard.filter(candidates => {
        let y = candidates.filter(candidate => {
          console.log(candidate, "candidate");
          if (rowIndex === row && candidate === valueToScratchOff) {
            console.log("scratched OFF triggered");
            return false;
          } else return true;
        });
        console.log(y, "y");
        console.log(rowIndex, "rowIndex");
        return y;
      });
      console.log(x, "x");
      return x;
    });
  };

  isFixedField = field => {
    return field.length === 1;
  };
}

export default new RangeChecking();
