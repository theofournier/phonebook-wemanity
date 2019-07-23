import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
});

const MyToggleMenu = ({ classes, handleClose, isMenuOpen, anchorEl, classeNamePaper, children }) => {
  return (
    <div className={classes.root}>
      <Popper
        open={isMenuOpen}
        anchorEl={anchorEl}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className={classeNamePaper}>
            {children}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}

MyToggleMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  classeNamePaper: PropTypes.string,
};

export default withStyles(styles)(MyToggleMenu);
