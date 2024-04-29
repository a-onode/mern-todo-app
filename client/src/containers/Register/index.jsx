import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsExclamationTriangleFill } from 'react-icons/bs';

import authApi from '../../api/authService';
import { REGEX } from '../../constants';

import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

import styles from '../../styles/modules/register.module.scss';

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const inputs = [
    {
      id: 1,
      type: 'text',
      name: 'name',
      label: 'Username',
      pattern: REGEX.USERNAME,
      errorMessage: "Username must be 3-24 characters and shouldn't contain special characters.",
      required: true
    },
    {
      id: 2,
      type: 'text',
      name: 'email',
      label: 'Email Address',
      pattern: REGEX.EMAIL,
      errorMessage: 'Please enter a valid email address.'
    },
    {
      id: 3,
      type: 'password',
      name: 'password',
      label: 'Password',
      pattern: REGEX.PASSWORD,
      errorMessage: 'Password must contain at least 8 characters, 1 number, and 1 letter.',
      required: true
    },
    {
      id: 4,
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      pattern: values.password,
      errorMessage: 'Password does not match.',
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
      const response = await authApi.register(values);
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
                isError={errorMessage}
              />
            </div>
          ))}
          <div className={styles.form__group}>
            <Button type='submit' text='Sign Up' variant='primary' />
          </div>
        </form>
      </div>
      <p className={styles.login}>
        Already have an account?{' '}
        <Link className={styles.login__link} to='/login'>
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;
