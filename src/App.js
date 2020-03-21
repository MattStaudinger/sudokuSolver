import React, { Component } from "react";
import Sudoku from "./Components/Sudoku";
import SudokuMaker from "./Components/SudokuMaker";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "sudoku" //"sudoku", "sudokuMaker"
    };
  }
  render() {
    const { view } = this.state;
    return (
      <div className="App">
        {view === "sudoku" && <Sudoku />}
        {view === "sudokuMaker" && <SudokuMaker />}
      </div>
    );
  }
}

export default App;
