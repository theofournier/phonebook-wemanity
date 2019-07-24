import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, MenuItem, ListItemIcon, Divider } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined';
import { dateFormatting } from '../../utils/helper';
import ContactIcon from './ContactIcon';
import { colors } from '../../utils/config';
import MyToggleMenu from '../common/MyToggleMenu';
import DialogConfirmation from '../common/DialogConfirmation';
import { deleteContact, getContacts } from '../../actions/contactAction';

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
  buttonContainer: {
    position: 'absolute',
    right: '10px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttonCollapseContainer: {
    position: 'absolute',
    right: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  buttonIcon: {
    color: colors.primary,
    height: 30,
    width: 30,
  },
  iconMenu: {
    color: colors.primary,
    height: 20,
    width: 20,
  },
});

// Component displayed in the contact list
const ContactItem = ({ classes, deleteContact, getContacts, data: { _id, firstName, lastName, phone, dateAdd } }) => {
  const [anchorElContact, setAnchorElContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const initialName = (firstName ? firstName[0] : '') + ' ' + (lastName ? lastName[0] : '');

  const onDelete = () => {
    deleteContact(_id, getContacts);
    handleCloseDialog();
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenContactMenu = (e) => {
    setAnchorElContact(e.currentTarget);
  };

  const handleCloseContactMenu = () => {
    setAnchorElContact(null);
  };

  const renderMenuContact = () => {
    return (
      <MyToggleMenu
        handleClose={() => handleCloseContactMenu()}
        isMenuOpen={Boolean(anchorElContact)}
        anchorEl={anchorElContact}
      >
        <>
          <MenuItem
            to={{
              pathname: `/updatecontact/${_id}`,
              state: { _id, firstName, lastName, phone, dateAdd },
            }}
            component={Link}
          >
            <ListItemIcon>
              <EditOutlined className={classes.iconMenu} />
            </ListItemIcon>
            <Typography variant="subtitle2">
              Edit
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => { handleOpenDialog(); handleCloseContactMenu(); }}
          >
            <ListItemIcon>
              <DeleteOutlined className={classes.iconMenu} />
            </ListItemIcon>
            <Typography variant="subtitle2">
              Delete
            </Typography>
          </MenuItem>
        </>
      </MyToggleMenu>
    );
  }

  const renderDialog = () => {
    return (
      <DialogConfirmation
        handleCancel={handleCloseDialog}
        handleConfirm={onDelete}
        dialogOpen={openDialog}
        title='Confirm delete contact'
        textContent={`Do you want delete the contact ${firstName} ${lastName}?`}
      />
    );
  }

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
      <div className={classes.buttonContainer}>
        <IconButton
          to={{
            pathname: `/updatecontact/${_id}`,
            state: { _id, firstName, lastName, phone, dateAdd },
          }}
          component={Link}
        >
          <EditOutlined className={classes.buttonIcon} />
        </IconButton>
        <IconButton
          onClick={handleOpenDialog}
        >
          <DeleteOutlined className={classes.buttonIcon} />
        </IconButton>
      </div>
      <div className={classes.buttonCollapseContainer}>
        <IconButton
          onClick={handleOpenContactMenu}
        >
          <MoreVertOutlined className={classes.buttonIcon} />
        </IconButton>
      </div>
      {renderMenuContact()}
      {renderDialog()}
    </div>
  )
}

ContactItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  contact: state.contact
});

export default connect(
  mapStateToProps,
  { deleteContact, getContacts }
)(withStyles(styles)(ContactItem));