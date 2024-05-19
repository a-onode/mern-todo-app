import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsExclamationTriangleFill } from 'react-icons/bs';

import authApi from '../../api/authService';
import { REGEX } from '../../constants';

import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

import styles from '../../styles/modules/login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: 'testuser@email.com',
    password: 'Todolist1234'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const inputs = [
    {
      id: 1,
      type: 'email',
      name: 'email',
      label: 'Email Address',
      pattern: REGEX.EMAIL,
      errorMessage: 'Please enter a valid email address.',
      required: true
    },
    {
      id: 2,
      type: 'password',
      name: 'password',
      label: 'Password',
      pattern: REGEX.PASSWORD,
      errorMessage: 'Password must contain at least 8 characters, 1 number, and 1 letter.',
      required: true
    }
  ];

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login(values);
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <form className={styles.form__container} onSubmit={handleSubmit}>
          {errorMessage && (
            <div className={styles.errorMessage}>
              <BsExclamationTriangleFill size={16} />
              <p>{errorMessage}</p>
            </div>
          )}
          {inputs.map(input => (
            <div key={input.id} className={styles.form__group}>
              <Input
                {...input}
                value={values[input.name]}
                onChange={handleChange}
                isError={!!errorMessage}
              />
            </div>
          ))}
          <div className={styles.form__group}>
            <Button type='submit' text='Sign In' variant='primary' />
          </div>
        </form>
      </div>
      <p className={styles.signupInvitation}>
        Don't have an account?{' '}
        <Link className={styles.signupInvitation__link} to='/register'>
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
