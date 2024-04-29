import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTasks } from '../../features/taskSlice';

import AppHeader from '../../components/Home/AppHeader';
import Header from '../../components/Common/Header';
import Loader from '../../components/Common/Loader';
import PlusAndFolderIcon from '../../components/Common/Icon';
import TodoItem from '../../components/Home/TodoItem';

import styles from '../../styles/modules/home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task.value);
  const filterStatus = useSelector(state => state.task.filterStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTasks())
      .unwrap()
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') {
      return true;
    }
    return task.status === filterStatus;
  });

  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className={styles.appHeader}>
          <AppHeader />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.appContent}>
            {filteredTasks.length > 0 ? (
              <div className={styles.wrapper}>
                {filteredTasks.map(task => {
                  return <TodoItem key={task._id} task={task} />;
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <PlusAndFolderIcon className={styles.emptyState__icon} />
                <h3 className={styles.emptyState__title}>No tasks</h3>
                <p className={styles.emptyState__description}>
                  Get started by creating a new task.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
