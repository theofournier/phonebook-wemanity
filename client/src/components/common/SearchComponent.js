import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ClearOutlined from '@material-ui/icons/ClearOutlined';
import { colors } from '../../utils/config';
import { isEmpty } from '../../utils/helper';

const styles = (theme) => ({
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      },
    },
  }
});

const SearchComponent = ({ classes, searchValue, searchFunction, label }) => {

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      searchFunction(searchValue);
    }
  };

  const clear = () => {
    searchFunction('');
  }

  return (
    <TextField
      className={classes.textField}
      variant="outlined"
      value={searchValue}
      onChange={(e) => searchFunction(e.target.value)}
      label={label}
      onKeyPress={keyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!isEmpty(searchValue) ?
              <IconButton onClick={clear}>
                <ClearOutlined />
              </IconButton>
              : null}
            <IconButton onClick={(e) => searchFunction(searchValue)}>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

SearchComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  searchValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  searchFunction: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchComponent);
