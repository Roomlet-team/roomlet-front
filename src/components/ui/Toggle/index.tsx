import React, { FC, useState } from 'react';
import styles from './styles/styles.module.css';

type ToggleProps = {
  onChange: (e: React.ChangeEvent) => void;
  checked?: boolean;
  theme?: 'red500' | 'black400';
};

const Toggle: FC<ToggleProps> = (props) => {
  const { onChange, theme = 'red500', checked } = props;

  return (
    <input
      className={`${styles['common-toggle']} ${styles[theme]}`}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Toggle;
