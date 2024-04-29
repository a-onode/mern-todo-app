import React, { useState } from 'react';
import { GoTrash, GoPencil } from 'react-icons/go';

import formatDate from '../../../utils/date';
import getClasses from '../../../utils/getClasses';

import CheckButton from '../../Common/CheckButton';
import Dialog from '../../Common/Dialog';
import Modal from '../../Common/Modal';

import styles from '../../../styles/modules/todoItem.module.scss';

const TodoItem = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div className={styles.todo}>
        <div className={styles.todo__details}>
          <CheckButton task={task} handleCheck={handleCheck} />
          <div className={styles.todo__texts}>
            <p
              className={getClasses([
                styles.todo__title,
                task.status === 'complete' && styles['todo__title--completed']
              ])}
            >
              {task.title}
            </p>
            <p className={styles.todo__date}>{formatDate(task.createdAt)}</p>
          </div>
        </div>

        <div className={styles.todo__actions}>
          <button className={styles.todo__action} onClick={() => setOpenModal(true)}>
            <GoPencil />
          </button>
          <button className={styles.todo__action} onClick={() => setOpenDialog(true)}>
            <GoTrash />
          </button>
        </div>
      </div>
      {openModal && (
        <Modal type='update' openModal={openModal} setOpenModal={setOpenModal} task={task} />
      )}
      {openDialog && (
        <Dialog type='delete' openDialog={openDialog} setOpenDialog={setOpenDialog} task={task} />
      )}
    </>
  );
};

export default TodoItem;
