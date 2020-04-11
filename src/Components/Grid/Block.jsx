import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";

import Paper from "@material-ui/core/Paper";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        height: "100%",
        cursor: "auto",
      },
      input: {
        textAlign: "center",
        fontSize: "2em",
        // color: "#0000006e",
      },
    },
  },
});

const styles = (theme) => ({
  paper: {
    height: 70,
    width: 70,
    "&:hover": {
      opacity: "0.6",
    },
  },
  input: {
    color: "#0000006e",
  },
  inputError: {
    color: "red",
    weight: "800",
  },
  inputOpaque: {
    opacity: "0.2",
  },
});

class Block extends Component {
  getInputStyle = () => {
    const { invalidInput, inputName, classes } = this.props;

    if (invalidInput && invalidInput !== inputName) return classes.inputOpaque;
    else if (invalidInput === inputName) return classes.inputError;
    else return classes.input;
  };

  render() {
    const {
      classes,
      backgroundColor,
      handleInputChange,
      inputName,
      sudokuBoard,
    } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper
          className={classes.paper}
          style={{ backgroundColor: backgroundColor }}
        >
          <InputBase
            onChange={handleInputChange}
            name={inputName}
            value={!!sudokuBoard ? sudokuBoard[inputName] : ""}
            className={this.getInputStyle()}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Block);
