import React from 'react';

import styles from '../../../styles/modules/icon.module.scss';

const PlusAndFolderIcon = ({ color = 'currentColor', width = '24', height = '24' }) => {
  return (
    <svg
      className={styles.plusAndFolderIcon}
      fill='none'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      stroke={color}
      aria-hidden='true'
    >
      <path
        vectorEffect='non-scaling-stroke'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
      />
    </svg>
  );
};

export default PlusAndFolderIcon;
