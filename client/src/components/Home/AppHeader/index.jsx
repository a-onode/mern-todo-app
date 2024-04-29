import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateStatus } from '../../../features/taskSlice';

import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import SelectOption from '../../Common/SelectOption';

import styles from '../../../styles/modules/appHeader.module.scss';

const AppHeader = () => {
  const dispatch = useDispatch();
  const filterStatus = useSelector(state => state.task.filterStatus);
  const [openModal, setOpenModal] = useState(false);

  const handleStatusChange = e => {
    dispatch(updateStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <div className={styles.appHeader__selectOption}>
        <SelectOption name='status' value={filterStatus} onChange={e => handleStatusChange(e)}>
          <option value='all'>All</option>
          <option value='incomplete'>Incomplete</option>
          <option value='complete'>Complete</option>
        </SelectOption>
      </div>
      <div className={styles.appHeader__addButton}>
        <Button
          type='button'
          text='Add Task'
          variant='primary'
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && <Modal type='add' openModal={openModal} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default AppHeader;
