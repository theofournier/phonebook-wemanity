import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../utils/config';

const styles = (theme) => ({
  mainContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    fontSize: '20px',
    color: '#fff',
    lineHeight: '50px',
    textAlign: 'center',
    backgroundColor: colors.primary
  }
});

// Circle div
const ContactIcon = ({ classes, children }) => {
  return (
    <div className={classes.mainContainer}>
      {children}
    </div>
  )
}

ContactIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactIcon);