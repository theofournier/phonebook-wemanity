import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ContactForm from '../common/ContactForm';
import { updateContact, getContact, setContact } from '../../actions/contactAction';
import MyCircularProgress from '../common/MyCircularProgress';
import { colors } from '../../utils/config';

const styles = (theme) => ({
  root: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  titlesContainer: {
    textAlign: 'center',
    margin: '30px 0 50px 0',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  title: {
    color: colors.primary,
    fontWeight: 400
  }
});

const UpdateContact = ({ classes, updateContact, getContact, setContact, contact: { contact, loading, errors }, match, location }) => {
  useEffect(() => {
    if (location.state) {
      setContact(location.state);
    } else {
      getContact(match.params._id);
    }
  }, [getContact, location.state, match.params._id, setContact]);

  const [backHome, setBackHome] = useState(false);

  if (backHome) {
    return <Redirect to='/' />
  }

  return (
    <div className={classes.root}>
      <div className={classes.titlesContainer}>
        <Typography className={classes.title} variant='h3'>Update contact</Typography>
      </div>
      <div className={classes.formContainer}>
        {loading.contact ?
          <MyCircularProgress />
          : <ContactForm
            data={contact}
            onSave={(contactUpdated) => updateContact(match.params._id, contactUpdated, () => setBackHome(true))}
            onCancel={() => setBackHome(true)}
            progress={loading.updateContact}
          />
        }
      </div>
    </div>
  )
}

UpdateContact.propTypes = {
  classes: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  updateContact: PropTypes.func.isRequired,
  getContact: PropTypes.func.isRequired,
  setContact: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  contact: state.contact
});

export default connect(
  mapStateToProps,
  { updateContact, getContact, setContact }
)(withStyles(styles)(UpdateContact));