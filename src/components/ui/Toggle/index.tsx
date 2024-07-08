import React, { FC, useState } from 'react';
import styles from './styles/styles.module.css';

type ToggleProps = {
  onChange: (e: React.ChangeEvent) => void;
};

const Toggle: FC<ToggleProps> = (props) => {
  const { onChange } = props;

  return <input className={styles['common-toggle']} type="checkbox" onChange={onChange} />;
};

export default Toggle;
