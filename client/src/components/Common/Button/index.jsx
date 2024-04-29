import React from 'react';

import getClasses from '../../../utils/getClasses';

import styles from '../../../styles/modules/button.module.scss';

const variants = {
  primary: 'custom-button-primary',
  secondary: 'custom-button-secondary',
  danger: 'custom-button-danger'
};

const Button = props => {
  const { type, text, variant, disabled = false, ...rest } = props;

  return (
    <button
      type={type}
      className={getClasses([styles.button, styles[variants[variant]]])}
      disabled={disabled}
      {...rest}
    >
      {props.text}
    </button>
  );
};

export default Button;
