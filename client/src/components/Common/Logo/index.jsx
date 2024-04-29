import React from 'react';

import logoImage from '../../../../public/images/logo.png';

import styles from '../../../styles/modules/logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logo__icon}>
        <img src={logoImage} alt='logo' />
      </div>
      <h1 className={styles.logo__text}>
        Todo<span>L</span>ist
      </h1>
    </div>
  );
};

export default Logo;
