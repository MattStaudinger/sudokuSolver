class SudokuSolver {
  validate = sudokuBoard => {
    console.log("called function validate", sudokuBoard);

    for (let pos in sudokuBoard) {
      console.log(pos, "pos");

      this.validateRow(pos, sudokuBoard);
    }
  };

  validateRow = (field, sudokuBoard) => {};

  validateColumn = (field, sudokuBoard) => {};

  validateBox = (field, sudokuBoard) => {};

  solve = sudokuBoard => {
    console.log("called function solve with ", sudokuBoard);
  };
}

export default new SudokuSolver();
