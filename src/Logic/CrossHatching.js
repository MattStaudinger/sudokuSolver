import BoardPositions from "./BoardPositions";

class CrossHatching {
  constructor() {
    this.sudokuBoard = null;
    this.hasNewCandidateFound = false;
  }

  //crossHatching: check for rows, columns and blocks and scratch out all options of each field
  // that aren't possible - referred to as "cross-hatching"
  solve = sudokuBoard => {
    console.log("----- Level 1: crossHatching ----");
    this.sudokuBoard = sudokuBoard;
    let counter = 0;
    do {
      counter++;
      console.log(
        "----------------ROUND " + counter + " crossHatching -----------------"
      );
      this.hasNewCandidateFound = false;
      this.checkRows();
      this.checkColumns();
      this.checkBlocks();
    } while (this.hasNewCandidateFound);

    return this.sudokuBoard;
  };

  checkRows = () => {
    for (let y = 0; y < 9; y++) {
      this.checkRow(y);
    }
  };

  checkColumns = () => {
    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(
      this.sudokuBoard
    );

    for (let x = 0; x < 9; x++) {
      this.checkRow(x);
    }

    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(
      this.sudokuBoard
    );
  };

  checkBlocks = () => {
    this.sudokuBoard = BoardPositions.switchBoardToBlockArrays(
      this.sudokuBoard
    );

    for (let y = 0; y < 9; y++) {
      this.checkRow(y);
    }

    this.checkBlocksForSinglePossibleCandidates();

    this.sudokuBoard = BoardPositions.switchBoardToBlockArrays(
      this.sudokuBoard
    );
  };

  checkBlocksForSinglePossibleCandidates = () => {
    this.sudokuBoard = this.sudokuBoard.map((y, rowIndex) => {
      const numbersWithSinglePossibleCandidates = this.getNumbersWithSinglePossibleCandidatesInBlock(
        y,
        rowIndex
      );

      return this.getUpdatedBlockArrayWithAllFoundSinglePossibleCandidateInField(
        y,
        numbersWithSinglePossibleCandidates
      );
    });
  };

  getUpdatedBlockArrayWithAllFoundSinglePossibleCandidateInField = (
    block,
    numbersWithSinglePossibleCandidates
  ) => {
    return block.map(candidatesOfField => {
      const foundNumberWithSinglePossibleCandidate = this.getNumberWithSinglePossibleCandidateInField(
        candidatesOfField,
        numbersWithSinglePossibleCandidates
      );

      if (foundNumberWithSinglePossibleCandidate) {
        this.hasNewCandidateFound = true;
        return [foundNumberWithSinglePossibleCandidate];
      } else return candidatesOfField;
    });
  };

  getNumberWithSinglePossibleCandidateInField = (
    candidatesOfField,
    numbersWithSinglePossibleCandidates
  ) => {
    return candidatesOfField.find(candidate => {
      return numbersWithSinglePossibleCandidates.includes(candidate);
    });
  };

  getNumbersWithSinglePossibleCandidatesInBlock = (block, rowIndex) => {
    let numbersWithSinglePossibleCandidates = [];
    const fixedNumbers = this.getAllFixedNumbersOfArray(rowIndex);

    for (let number = 1; number <= 9; number++) {
      let singleNumberCounter = 0;
      block.forEach(candidatesOfField => {
        if (
          !this.isFixedField(candidatesOfField) &&
          candidatesOfField.includes(number)
        ) {
          singleNumberCounter++;
        }
      });
      if (singleNumberCounter === 1 && !fixedNumbers.includes(number)) {
        numbersWithSinglePossibleCandidates.push(number);
      }
    }

    return numbersWithSinglePossibleCandidates;
  };

  checkRow = y => {
    let fixedNumbers = this.getAllFixedNumbersOfArray(y);

    this.sudokuBoard[y] = this.sudokuBoard[y].map(x => {
      if (this.isFixedField(x)) return x;
      const newPossibleNumbersForField = this.scratchAllFixedNumbersFromField(
        x,
        fixedNumbers
      );
      return newPossibleNumbersForField;
    });
  };

  getAllFixedNumbersOfArray = y => {
    const fixedFields = this.sudokuBoard[y].filter(x => this.isFixedField(x));
    const fixedNumbers = fixedFields.map(field => field[0]);

    return fixedNumbers;
  };

  scratchAllFixedNumbersFromField = (field, fixedNumbers) => {
    return field.filter(possibleNumberOfField => {
      if (fixedNumbers.includes(possibleNumberOfField)) {
        this.hasNewCandidateFound = true;
        return false;
      } else {
        return true;
      }
    });
  };

  isFixedField = field => {
    return field.length === 1;
  };
}

export default new CrossHatching();
