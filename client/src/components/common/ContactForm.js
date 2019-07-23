import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import { isEmpty, isValidPhone } from '../../utils/helper';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import { colors } from '../../utils/config';
import MyCircularProgress from './MyCircularProgress';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 20px 0'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textField: {
    width: '100%',
    margin: '0 0 20px 0',
  },
  iconCancel: {
    color: colors.cancel,
    width: 30,
    height: 30
  },
  iconAccept: {
    color: colors.primary,
    width: 40,
    height: 40
  }
});

const ContactForm = ({ classes, data, onSave, onCancel, progress }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [firstNameError, setFirstNameError] = useState({
    error: false,
    message: ''
  });
  const [lastNameError, setLastNameError] = useState({
    error: false,
    message: ''
  });
  const [phoneError, setPhoneError] = useState({
    error: false,
    message: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
      });
    }
  }, [data]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const inputsValidation = () => {
    let valid = true;
    if (isEmpty(formData.firstName)) {
      setFirstNameError({
        error: true,
        message: 'First name is required',
      });
      valid = false;
    } else {
      setFirstNameError({
        error: false,
        message: '',
      });
    }

    if (isEmpty(formData.lastName)) {
      setLastNameError({
        error: true,
        message: 'Last name is required',
      });
      valid = false;
    } else {
      setLastNameError({
        error: false,
        message: '',
      });
    }

    if (isEmpty(formData.phone)) {
      setPhoneError({
        error: true,
        message: 'Phone number is required',
      });
      valid = false;
    } else if (!isValidPhone(formData.phone)) {
      setPhoneError({
        error: true,
        message: 'Phone number is invalid',
      });
      valid = false;
    } else {
      setPhoneError({
        error: false,
        message: '',
      });
    }
    return valid;
  };

  const onSubmit = () => {
    if (inputsValidation()) {
      onSave(formData);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <TextField
          required
          className={classes.textField}
          name="firstName"
          label='First Name'
          value={formData.firstName}
          onChange={onChange}
          error={firstNameError.error}
          helperText={firstNameError.message}
        />
        <TextField
          required
          className={classes.textField}
          name="lastName"
          label='Last Name'
          value={formData.lastName}
          onChange={onChange}
          error={lastNameError.error}
          helperText={lastNameError.message}
        />
        <TextField
          required
          className={classes.textField}
          name="phone"
          label='No Phone'
          value={formData.phone}
          onChange={onChange}
          error={phoneError.error}
          helperText={phoneError.message}
        />
      </div>
      {!progress ?
        <div className={classes.buttonContainer}>
          {onCancel ?
            <IconButton onClick={onCancel}>
              <CancelOutlined className={classes.iconCancel} />
            </IconButton>
            : null}
          <IconButton onClick={onSubmit}>
            <DoneOutlined className={classes.iconAccept} />
          </IconButton>
        </div>
        : <MyCircularProgress />}
    </div>
  )
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  progress: PropTypes.bool
};

export default withStyles(styles)(ContactForm);