import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  button: {
    color: "white",
    backgroundColor: "#606060",
  },
});

class SudokuButton extends Component {
  render() {
    const { classes, onClick, title } = this.props;
    return (
      <Button onClick={onClick} variant="contained" className={classes.button}>
        {title}
      </Button>
    );
  }
}

export default withStyles(styles)(SudokuButton);
