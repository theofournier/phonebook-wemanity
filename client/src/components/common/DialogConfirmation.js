import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';

const styles = (theme) => ({
});

// Component Dialog with 2 buttons : confirm and cancel

const DialogConfirmation = ({ handleCancel, handleConfirm, dialogOpen, title, textContent }) => {

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleCancel}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {textContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  dialogOpen: PropTypes.bool,
  title: PropTypes.string,
  textContent: PropTypes.string,
};

export default withStyles(styles)(DialogConfirmation);
