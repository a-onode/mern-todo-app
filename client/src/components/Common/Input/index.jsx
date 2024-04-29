import React, { useState } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';

import styles from '../../../styles/modules/input.module.scss';

const Input = props => {
  const { name, label, type, value, onChange, errorMessage, isError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const inputClassName = `${styles.input} ${isError && focused ? styles.error : ''}`;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={inputClassName}
        value={value}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        autoComplete='off'
        {...rest}
      />
      <div className={styles.errorMessage}>
        <BsExclamationTriangleFill size={16} />
        <p>{errorMessage}</p>
      </div>
    </>
  );
};

export default Input;
