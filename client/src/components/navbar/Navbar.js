import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Typography } from '@material-ui/core';
import logo from '../../images/logo.png';
import { colors } from '../../utils/config';

const styles = (theme) => ({
  appBar: {
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: '0 2rem'
  },
  logoContainer: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'noWrap',
    alignItems: 'center',
    margin: '0 50px 0 0'
  },
  logo: {
    width: 60,
    height: 60
  },
  button: {
    margin: '0 0.25rem',
  }
});

const Navbar = ({ classes }) => {
  return (
    <AppBar className={classes.appBar}>
      <Link to="/" className={classes.logoContainer}>
        <img className={classes.logo} src={logo} alt="logo" />
        <Typography variant='h6'>Phone Book</Typography>
      </Link>
      <div>
        <Button
          className={classes.button}
          to="/"
          component={Link}
          color="inherit"
        >
          Contacts
        </Button>
        <Button
          className={classes.button}
          to="/newcontact"
          component={Link}
          color="inherit"
        >
          Add Contact
        </Button>
      </div>
    </AppBar>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
