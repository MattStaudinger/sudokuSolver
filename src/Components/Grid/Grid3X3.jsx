import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withStyles,} from "@material-ui/core/styles";
import Box from './Box'

const styles = theme => ({

});
class Grid3X3 extends Component {

  render() {
    const {backgroundColor, handleInputChange, BoxNumber} = this.props
    return (
      <React.Fragment>
        <Grid container spacing={2} justify= "center">
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Box 
                backgroundColor = {backgroundColor}
                inputName = {`${BoxNumber}-0-${value}`}
                handleInputChange = {handleInputChange}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justify= "center">
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Box 
                backgroundColor = {backgroundColor}
                inputName = {`${BoxNumber}-1-${value}`}
                handleInputChange = {handleInputChange}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} justify= "center">
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <Box 
                backgroundColor = {backgroundColor}
                inputName = {`${BoxNumber}-2-${value}`}
                handleInputChange = {handleInputChange}
              />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(Grid3X3);
