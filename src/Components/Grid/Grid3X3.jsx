import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Block from "./Block";

const styles = (theme) => ({});
class Grid3X3 extends Component {
  render() {
    const {
      backgroundColor,
      handleInputChange,
      blockNumber,
      getInputNameBasedOnCoordinate,
      sudokuBoard,
      invalidInput,
    } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={2} justify="center">
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Block
                backgroundColor={backgroundColor}
                inputName={getInputNameBasedOnCoordinate(
                  `${blockNumber}-0-${value}`
                )}
                handleInputChange={handleInputChange}
                sudokuBoard={sudokuBoard}
                invalidInput={invalidInput}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justify="center">
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Block
                backgroundColor={backgroundColor}
                inputName={getInputNameBasedOnCoordinate(
                  `${blockNumber}-1-${value}`
                )}
                handleInputChange={handleInputChange}
                sudokuBoard={sudokuBoard}
                invalidInput={invalidInput}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justify="center">
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Block
                backgroundColor={backgroundColor}
                inputName={getInputNameBasedOnCoordinate(
                  `${blockNumber}-2-${value}`
                )}
                handleInputChange={handleInputChange}
                sudokuBoard={sudokuBoard}
                invalidInput={invalidInput}
              />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Grid3X3);
