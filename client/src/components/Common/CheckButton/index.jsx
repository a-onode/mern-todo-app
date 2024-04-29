import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { updateTask } from '../../../features/taskSlice';

import styles from '../../../styles/modules/checkButton.module.scss';

const checkBoxVariants = {
  check: {
    backgroundColor: '#4f46e5',
    transition: {
      duration: 0.1
    }
  },
  uncheck: {
    backgroundColor: '#fff',
    transition: {
      duration: 0.1
    }
  }
};

const checkIconVariants = {
  initial: {
    color: '#fff'
  },
  check: {
    pathLength: 1
  },
  uncheck: {
    pathLength: 0
  }
};

const CheckButton = ({ task }) => {
  const dispatch = useDispatch();

  const handleCheck = () => {
    if (task.status === 'complete') {
      dispatch(updateTask({ id: task._id, status: 'incomplete' }));
    } else {
      dispatch(updateTask({ id: task._id, status: 'complete' }));
    }
  };

  return (
    <motion.div
      className={styles.checkBox}
      variants={checkBoxVariants}
      animate={task.status === 'complete' ? 'check' : 'uncheck'}
      onClick={() => handleCheck()}
    >
      <motion.svg
        className={styles.checkIcon}
        viewBox='0 0 53 38'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.path
          variants={checkIconVariants}
          animate={task.status === 'complete' ? 'check' : 'uncheck'}
          fill='none'
          strokeMiterlimit='10'
          strokeWidth='6'
          d='M1.5 22L16 36.5L51.5 1'
          strokeLinejoin='round'
          strokeLinecap='round'
        ></motion.path>
      </motion.svg>
    </motion.div>
  );
};

export default CheckButton;
