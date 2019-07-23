import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List, Divider } from '@material-ui/core';
import { getContacts, filterContacts } from '../../actions/contactAction';
import SearchComponent from '../common/SearchComponent';
import ContactItem from './ContactItem'
import { isEmpty } from '../../utils/helper';
import MyDefaultButton from '../common/MyDefaultButton';
import MyCircularProgress from '../common/MyCircularProgress';

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
    margin: '20px 0 30px 0',
  },
  mainTitle: {
    margin: '0 0 20px 0'
  },
  button: {
    margin: '0 0 20px',
  },
  countContainer: {
    width: '100%'
  },
  listContainer: {
    margin: '10px 0',
    width: '100%',
    height: '400px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  contactsDivider: {
    margin: '10px 0'
  }
});

const Home = ({ classes, getContacts, filterContacts, contact: { contactsSearchValue, contacts, contactsFiltered, loading, errors } }) => {
  useEffect(() => {
    getContacts();
  }, [getContacts]);

  let contactsListComponent;
  if (!isEmpty(contactsFiltered)) {
    contactsListComponent = (
      <List>
        {contactsFiltered.map((data, i) => (
          <div key={data._id}>
            <ContactItem
              data={data}
            />
            {i < contactsFiltered.length - 1 ?
              <Divider className={classes.contactsDivider} />
              : null
            }
          </div>
        ))}
      </List>
    );
  } else if (loading.contacts) {
    contactsListComponent = (
      <MyCircularProgress />
    );
  } else {
    contactsListComponent = (
      <Typography variant="h5">
        No contacts
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.titlesContainer}>
        <Typography className={classes.mainTitle} variant='h2'>Phone Book</Typography>
        <Typography variant='h5'>Consult, add and edit your contacts</Typography>
      </div>
      <MyDefaultButton
        className={classes.button}
        to='newcontact'
        component={Link}
      >
        Add Contact
      </MyDefaultButton>
      <SearchComponent
        label='Search a contact'
        searchValue={contactsSearchValue}
        searchFunction={(searchValue) => filterContacts(contacts, searchValue)}
      />
      <div className={classes.countContainer}>
        <Typography variant='caption'>{contactsFiltered.length} contacts</Typography>
      </div>
      <div className={classes.listContainer}>
        {contactsListComponent}
      </div>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact
});

export default connect(
  mapStateToProps,
  { getContacts, filterContacts }
)(withStyles(styles)(Home));