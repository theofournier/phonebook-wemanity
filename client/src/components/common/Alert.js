import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { removeAlert } from '../../actions/alertAction';
import MySnackbarContent from './MySnackbarContent';

const Alert = ({ alert, removeAlert }) => {
  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeAlert(alert.id);
  }

  if (alert !== null && alert.length > 0) {
    return (
      alert.map(alert => (
        <Snackbar
          key={alert.id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          onClose={handleCloseAlert}
        >
          <MySnackbarContent
            onClose={handleCloseAlert}
            variant={alert.alertType}
            message={alert.msg}
          />
        </Snackbar>
      ))
    )
  }
  return null;
}

Alert.propTypes = {
  alert: PropTypes.array.isRequired,
  removeAlert: PropTypes.func
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps, { removeAlert })(Alert);
