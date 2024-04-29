import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import auth from '../../../utils/auth';
import { setUser } from '../../../features/userSlice';

import styles from '../../../styles/layouts/home.module.scss';

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await auth.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
