import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';

import { storeTask, updateTask } from '../../../features/taskSlice';

import Button from '../Button';
import Input from '../Input';
import SelectOption from '../SelectOption';

import styles from '../../../styles/modules/modal.module.scss';

const Modal = ({ type, setOpenModal, task }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && task) {
      setTitle(task.title);
      setStatus(task.status);
    }
  }, [type, task]);

  const handleSubmit = async event => {
    event.preventDefault();
    switch (type) {
      case 'add':
        dispatch(storeTask({ title, status }));
        setOpenModal(false);
        break;
      case 'update':
        dispatch(updateTask({ id: task._id, title, status }));
        setOpenModal(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={() => setOpenModal(false)}></div>
      <div className={styles.modal__content}>
        <div className={styles.closeButton}>
          <button onClick={() => setOpenModal(false)}>
            <MdOutlineClose size={24} />
          </button>
        </div>
        <form className={styles.form} action='' onSubmit={handleSubmit}>
          <h1 className={styles.form__title}>
            {type === 'add' ? 'ADD' : 'UPDATE'} <span>T</span>ODO
          </h1>
          <div className={styles.form__group}>
            <Input
              type='text'
              value={title}
              label='Title'
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className={styles.form__group}>
            <label htmlFor='status' className={styles.form__label}>
              Status
            </label>
            <SelectOption
              name='status'
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option value='incomplete'>Incomplete</option>
              <option value='complete'>Complete</option>
            </SelectOption>
          </div>
          <div className={styles.form__actions}>
            <Button
              type='button'
              text='Cancel'
              variant='secondary'
              onClick={() => setOpenModal(false)}
            />
            <Button
              type='submit'
              text={type === 'add' ? 'Add' : 'Update'}
              variant='primary'
              disabled={title.length === 0}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
