import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Button, Paper } from "@material-ui/core";

const styles = theme => ({
  paper: {
    minHeight: "600px",
    width: "600px"
  }
});

class SudokuMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: "",
      arrayOutput: ""
    };
  }

  handleSudokuArrayMaker = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  convertTo2DArray = () => {
    console.log(this.state.numbers);
    const { numbers } = this.state;

    let arrayOutput = "[[";
    const digits = numbers.split("");
    digits.forEach((digit, index) => {
      arrayOutput += `${digit}, `;
      if (index % 9 === 8 && index !== 80) arrayOutput += `], [`;
      else if (index === 80) arrayOutput += "]";
    });
    arrayOutput += "]";

    this.setState({
      arrayOutput
    });
  };

  render() {
    const { classes } = this.props;
    const { numbers, arrayOutput } = this.state;
    return (
      <div>
        <TextField
          value={numbers}
          onChange={this.handleSudokuArrayMaker}
          name="numbers"
          multiline
          rows="6"
        />
        <Button variant="contained" onClick={this.convertTo2DArray}>
          Transform to array
        </Button>
        <Paper className={classes.paper}>
          <p>{arrayOutput}</p>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SudokuMaker);
