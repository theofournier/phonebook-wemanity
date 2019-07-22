import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({

});

const UpdateContact = ({ classes }) => {
  return (
    <div>
      Update Contact
    </div>
  )
}

UpdateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateContact);