import React, { FC } from 'react';
import styles from './styles/styles.module.css';

interface CHeckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactElement | React.ReactElement[] | string;
}

const CHeckbox: FC<CHeckboxProps> = (props) => {
  const { id, children, ...anotherProps } = props;

  return (
    <>
      <label className={styles['common-checkbox-label']} htmlFor={id}>
        <input className={styles['common-checkbox-input']} type="checkbox" id={id} {...anotherProps} />
        {children}
      </label>
    </>
  );
};

export default CHeckbox;
