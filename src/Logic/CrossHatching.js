import BoardPositions from "./BoardPositions";
import ScratchOffCheck from "./ScratchOffCheck";

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
      this.sudokuBoard = ScratchOffCheck.solve(this.sudokuBoard);
      this.checkRows();
      this.checkColumns();
      this.checkBlocks();
    } while (this.hasNewCandidateFound);

    return this.sudokuBoard;
  };

  checkRows = () => {
    this.checkArrayForSinglePossibleCandidates();
  };

  checkColumns = () => {
    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(
      this.sudokuBoard
    );

    this.checkArrayForSinglePossibleCandidates();

    this.sudokuBoard = BoardPositions.switchRowToColumnOfBoard(
      this.sudokuBoard
    );
  };

  checkBlocks = () => {
    this.sudokuBoard = BoardPositions.switchBoardToBlockArrays(
      this.sudokuBoard
    );

    this.checkArrayForSinglePossibleCandidates();

    this.sudokuBoard = BoardPositions.switchBoardToBlockArrays(
      this.sudokuBoard
    );
  };

  checkArrayForSinglePossibleCandidates = () => {
    this.sudokuBoard = this.sudokuBoard.map((y, rowIndex) => {
      const numbersWithSinglePossibleCandidates = this.getAllNumbersWithSinglePossibleCandidateInArray(
        y,
        rowIndex
      );

      return this.getUpdatedArrayWithAllFoundSinglePossibleCandidateInField(
        y,
        numbersWithSinglePossibleCandidates
      );
    });
  };

  getUpdatedArrayWithAllFoundSinglePossibleCandidateInField = (
    array,
    numbersWithSinglePossibleCandidates
  ) => {
    return array.map(candidatesOfField => {
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

  getAllNumbersWithSinglePossibleCandidateInArray = (array, rowIndex) => {
    let numbersWithSinglePossibleCandidates = [];
    const fixedNumbers = this.getAllFixedNumbersOfArray(rowIndex);

    for (let number = 1; number <= 9; number++) {
      let singleNumberCounter = 0;
      array.forEach(candidatesOfField => {
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

  getAllFixedNumbersOfArray = y => {
    const fixedFields = this.sudokuBoard[y].filter(x => this.isFixedField(x));
    const fixedNumbers = fixedFields.map(field => field[0]);

    return fixedNumbers;
  };

  isFixedField = field => {
    return field.length === 1;
  };
}

export default new CrossHatching();
