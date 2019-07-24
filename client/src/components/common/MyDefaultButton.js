import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { colors } from '../../utils/config';

const styles = () => ({
  base: {
    borderRadius: 0,
    fontWeight: 600,
  },
  default: {
    borderColor: colors.primary,
    color: colors.primary,
    '&:hover': {
      backgroundColor: colors.primary,
      color: 'white',
    },
  },
  accept: {
    borderColor: colors.accept,
    color: colors.accept,
    '&:hover': {
      backgroundColor: colors.accept,
      color: 'white',
    },
  },
  cancel: {
    borderColor: colors.cancel,
    color: colors.cancel,
    '&:hover': {
      backgroundColor: colors.cancel,
      color: 'white',
    },
  },
});

const MyDefaultButton = (props) => {
  const {
    classes, className, onClick, to, component, variant, disabled,
  } = props;

  // Get the style depending on the variant
  const classVariant = variant ? classes[variant] : classes.default;

  return (
    <Button
      className={classNames(classes.base, classVariant, className)}
      variant="outlined"
      onClick={onClick}
      to={to}
      component={component}
      disabled={disabled || false}
    >
      {props.children}
    </Button>
  );
};

MyDefaultButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  component: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'accept', 'cancel']),
  disabled: PropTypes.bool,
};

export default withStyles(styles)(MyDefaultButton);
