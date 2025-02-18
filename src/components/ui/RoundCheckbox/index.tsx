import React, { FC } from 'react';
import styles from './styles/styles.module.css';

interface CHeckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactElement | React.ReactElement[] | string;
}

const RoundCheckbox: FC<CHeckboxProps> = (props) => {
  const { id, children, ...anotherProps } = props;

  return (
    <>
      <label className={styles['common-round-checkbox-label']} htmlFor={id}>
        <input className={styles['common-round-checkbox-input']} type="checkbox" id={id} {...anotherProps} />
        {children}
      </label>
    </>
  );
};

export default RoundCheckbox;
