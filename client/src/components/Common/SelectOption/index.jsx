import React from 'react';

import styles from '../../../styles/modules/selectOption.module.scss';

const SelectOption = ({ children, name, ...rest }) => {
  return (
    <select className={styles.select} name={name} {...rest}>
      {children}
    </select>
  );
};

export default SelectOption;
