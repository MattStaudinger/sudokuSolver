import BoardPositions from "./BoardPositions";

class RangeChecking {
  constructor() {
    this.sudokuBoard = null;
    this.isNewNumberScratchedOff = false;
    this.checkColumnRowOrBlock = "";
  }

  // rangeChecking: When a candidate is possible in a certain block and row/column,
  // and it is not possible anywhere else in the same block, then it is also not possible
  // anywhere else in the same row/column
  solve = (sudokuBoard) => {
    console.log("----- Level 2: RangeChecking ----");
    this.sudokuBoard = sudokuBoard;
    let counter = 0;
    let hasFoundAtLeastOneCandidate = false;

    do {
      counter++;
      console.log(
        "----------------ROUND " + counter + " RangeChecking -----------------"
      );
      this.hasNewCandidateFound = false;

      this.checkRows();

      if (this.hasNewCandidateFound) hasFoundAtLeastOneCandidate = true;
    } while (this.hasNewCandidateFound);

    return {
      sudokuBoard: this.sudokuBoard,
      hasNewCandidateFound: hasFoundAtLeastOneCandidate,
    };
  };

  checkRows = () => {
    this.checkBlocksForCandidateInCommonColumnOrRow();
  };

  checkBlocksForCandidateInCommonColumnOrRow = () => {
    let sudokuBoardBlockArrays = [];
    sudokuBoardBlockArrays = BoardPositions.switchBoardToBlockArrays(
      this.sudokuBoard
    );

    let rowsWithEqualCandidates = []; // format: [{row: xy, value: z}]

    for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
      let rowWithEqualCandidates = this.checkBlockForCandidateInCommonRowOrColumn(
        sudokuBoardBlockArrays,
        blockNumber
      );

      rowsWithEqualCandidates.push(rowWithEqualCandidates);
    }

    rowsWithEqualCandidates.forEach((rowOfCandidates, blockNumber) => {
      rowOfCandidates.forEach((rowOfCandidate) => {
        this.scratchCandidatesOffRow(
          rowOfCandidate.row,
          rowOfCandidate.value,
          blockNumber
        );
      });
    });

    //same logic for columns
  };

  checkBlockForCandidateInCommonRowOrColumn = (
    sudokuBoardBlockArrays,
    blockNumber
  ) => {
    // console.log("blockNumber: ", blockNumber);
    const positionsOfEqualCandidates = this.findPositionsOfEqualNumbersInArray(
      sudokuBoardBlockArrays[blockNumber]
    ); //gets the positions (index) and the value of the equal candidate
    const rowsWithEqualCandidates = this.getPositionOfEqualNumbersOnlyFoundInSameRow(
      positionsOfEqualCandidates
    );

    const translatedPositionsWithEqualCandidates = this.getPositionsByBlockNumber(
      blockNumber,
      rowsWithEqualCandidates
    ); //depending on the blocknumber and if the array is modified for column or row, the position will be different

    return translatedPositionsWithEqualCandidates;
  };

  getPositionsByBlockNumber = (blockNumber, rowsWithEqualCandidates) => {
    return this.translateRowPositionByBlockNumber(
      blockNumber,
      rowsWithEqualCandidates
    );
  };

  translateRowPositionByBlockNumber = (
    blockNumber,
    rowsWithEqualCandidates
  ) => {
    const translatedRows = rowsWithEqualCandidates.map((row) => {
      switch (blockNumber) {
        case 0:
        case 1:
        case 2:
          return { ...row, blockNumber };
        case 3:
        case 4:
        case 5:
          return { row: row.row + 3, value: row.value, blockNumber };
        case 6:
        case 7:
        case 8:
          return { row: row.row + 6, value: row.value, blockNumber };
        default:
          throw new Error("can't translate row index of block out of range");
      }
    });
    return translatedRows;
  };

  findPositionsOfEqualNumbersInArray = (blockArray) => {
    let equalNumbers = [];
    for (let candidate = 1; candidate <= 9; candidate++) {
      let equalNumberCounter = { counter: 0, position: [] };

      blockArray.forEach((numberWithCandidates, position) => {
        if (numberWithCandidates.includes(candidate)) {
          equalNumberCounter.counter = equalNumberCounter.counter + 1;
          equalNumberCounter.position = [
            ...equalNumberCounter.position,
            position,
          ];
        }
      });
      if (equalNumberCounter.counter > 1)
        equalNumbers.push({
          position: equalNumberCounter.position,
          value: candidate,
        });
    }

    return equalNumbers;
  };

  getPositionOfEqualNumbersOnlyFoundInSameRow = (
    positionsOfEqualCandidates
  ) => {
    let rowsWithEqualCandidates = []; // format: [{row: xy, value: z}]

    positionsOfEqualCandidates.forEach((positionOfEqualCandidate) => {
      const rowWithEqualCandidate = this.findEqualCandidatesInBlockOnlyInEqualRow(
        positionOfEqualCandidate
      );
      if (rowWithEqualCandidate)
        rowsWithEqualCandidates.push(rowWithEqualCandidate);
    });

    return rowsWithEqualCandidates;
  };

  findEqualCandidatesInBlockOnlyInEqualRow = (positionOfEqualCandidate) => {
    // console.log("positionOfEqualCandidate: ", positionOfEqualCandidate);
    const validRows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    let startingRowOfCandidate = validRows.findIndex((row) =>
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
      value: positionOfEqualCandidate.value,
    };
  };

  scratchCandidatesOffRow = (row, valueToScratchOff, blockNumber) => {
    this.sudokuBoard = this.sudokuBoard.map((rowOfBoard, rowIndex) => {
      if (rowIndex !== row) return rowOfBoard;

      let x = rowOfBoard.map((candidates, column) => {
        let y = candidates.filter((candidate) => {
          if (
            candidate === valueToScratchOff &&
            !this.isBlockWhereValueToScratchOffWasFound(
              row,
              column,
              blockNumber
            )
          ) {
            this.hasNewCandidateFound = true;
            return false;
          } else return true;
        });
        return y;
      });
      return x;
    });
  };

  // check if the original value was found in the given block - if so, don't scratch off that value,
  // as this is the block where the values have to eventually be in
  isBlockWhereValueToScratchOffWasFound = (row, column, blockNumber) => {
    return this.isBlockWhereValueToScratchOffWasFoundInCommonRow(
      row,
      column,
      blockNumber
    );
  };

  isBlockWhereValueToScratchOffWasFoundInCommonRow = (
    row,
    column,
    blockNumber
  ) => {
    switch (blockNumber) {
      case 0:
        return row < 3 && column < 3;
      case 1:
        return row < 3 && column >= 3 && column < 6;
      case 2:
        return row < 3 && column >= 6 && column < 9;

      case 3:
        return row >= 3 && row < 6 && column < 3;
      case 4:
        return row >= 3 && row < 6 && column >= 3 && column < 6;
      case 5:
        return row >= 3 && row < 6 && column >= 6 && column < 9;

      case 6:
        return row >= 6 && row < 9 && column < 3;
      case 7:
        return row >= 6 && row < 9 && column >= 3 && column < 6;
      case 8:
        return row >= 6 && row < 9 && column >= 6 && column < 9;
      default:
        return true;
    }
  };

  isFixedField = (field) => {
    return field.length === 1;
  };
}

export default new RangeChecking();
