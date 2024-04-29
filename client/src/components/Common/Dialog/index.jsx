import React from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';
import { BsExclamationTriangle } from 'react-icons/bs';

import { destroyTask } from '../../../features/taskSlice';

import Button from '../Button';

import styles from '../../../styles/modules/dialog.module.scss';

const Dialog = ({ setOpenDialog, task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(destroyTask(task._id));
  };

  return (
    <div className={styles.dialog}>
      <div className={styles.dialog__overlay} onClick={() => setOpenDialog(false)}></div>
      <div className={styles.dialog__content}>
        <div className={styles.closeButton}>
          <button onClick={() => setOpenDialog(false)}>
            <MdOutlineClose size={24} />
          </button>
        </div>
        <div className={styles.dialog__details}>
          <div className={styles.iconWrapper}>
            <BsExclamationTriangle className={styles.icon} />
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.title}>{task.title}</h3>
            <p className={styles.description}>
              Are you sure you want to delete this task? All of your data will be permanently
              removed from our servers forever. This action cannot be undone.
            </p>
          </div>
        </div>
        <div className={styles.dialog__actions}>
          <Button
            type='button'
            text='Cancel'
            variant='secondary'
            onClick={() => setOpenDialog(false)}
          />
          <Button type='button' text='Delete' variant='danger' onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
