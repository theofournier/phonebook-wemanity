import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { colors } from '../../utils/config';

const styles = (theme) => ({
  progress: {
    margin: 'auto',
    color: colors.primary,
  },
});

const MyCircularProgress = (props) => {
  const { classes } = props;

  return <CircularProgress className={classes.progress} />;
};

MyCircularProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCircularProgress);
