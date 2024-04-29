import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import auth from '../../../utils/auth';

import Logo from '../../Common/Logo';

import styles from '../../../styles/layouts/auth.module.scss';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await auth.isAuthenticated();
      if (isAuth) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo />
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
