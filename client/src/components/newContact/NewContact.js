import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ContactForm from '../common/ContactForm';
import { addContact } from '../../actions/contactAction';
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
    width: '300px'
  },
  title: {
    color: colors.primary,
    fontWeight: 400
  }
});

const NewContact = ({ classes, addContact, contact: { loading, errors } }) => {
  const [backHome, setBackHome] = useState(false);

  // When click on cancel button, change state and Redirect
  if (backHome) {
    return <Redirect to='/' />
  }

  return (
    <div className={classes.root}>
      <div className={classes.titlesContainer}>
        <Typography className={classes.title} variant='h3'>Add contact</Typography>
      </div>
      <div className={classes.formContainer}>
        <ContactForm
          onSave={(contact) => addContact(contact, () => setBackHome(true))}
          onCancel={() => setBackHome(true)}
          progress={loading.addContact}
        />
      </div>
    </div>
  )
}

NewContact.propTypes = {
  classes: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  contact: state.contact
});

export default connect(
  mapStateToProps,
  { addContact }
)(withStyles(styles)(NewContact));