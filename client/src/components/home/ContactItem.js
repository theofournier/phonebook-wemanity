import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { dateFormatting } from '../../utils/helper';
import ContactIcon from './ContactIcon';
import { colors } from '../../utils/config';

const styles = (theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 20px',
    alignItems: 'center',
    position: 'relative'
  },
  iconContainer: {
    margin: '0 30px 0 0'
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameText: {
    fontWeight: 600
  },
  editContainer: {
    position: 'absolute',
    right: '10px'
  },
  editIcon: {
    color: colors.primary,
    height: 30,
    width: 30,
  },
});

const ContactItem = ({ classes, data: { firstName, lastName, phone, dateAdd } }) => {
  const initialName = (firstName ? firstName[0] : '') + ' ' + (lastName ? lastName[0] : '');
  return (
    <div className={classes.mainContainer}>
      <div className={classes.iconContainer}>
        <ContactIcon>
          {initialName.toUpperCase()}
        </ContactIcon>
      </div>
      <div className={classes.dataContainer}>
        <div className={classes.nameContainer}>
          <Typography className={classes.nameText} variant='body1'>{firstName} {lastName}</Typography>
        </div>
        <div className={classes.phoneContainer}>
          <Typography variant='body1'>{phone}</Typography>
        </div>
        <div className={classes.dateAddContainer}>
          <Typography variant='caption'>Added the: {dateFormatting(dateAdd)}</Typography>
        </div>
      </div>
      <div className={classes.editContainer}>
        <IconButton
          to='/updatecontact'
          component={Link}
        >
          <EditOutlined className={classes.editIcon} />
        </IconButton>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactItem);