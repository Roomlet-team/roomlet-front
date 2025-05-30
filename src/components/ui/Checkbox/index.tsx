import React, { FC } from 'react';
import styles from './styles/styles.module.css';

interface CHeckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactElement | React.ReactElement[] | string;
  variant?: 'default' | 'circle';
}

const CHeckbox: FC<CHeckboxProps> = (props) => {
  const { id, children, variant = 'default', ...anotherProps } = props;

  const labelClass =
    variant === 'circle' ? `${styles['common-checkbox-label']} ${styles['circle']}` : styles['common-checkbox-label'];

  return (
    <>
      <label className={labelClass} htmlFor={id}>
        <input className={styles['common-checkbox-input']} type="checkbox" id={id} {...anotherProps} />
        {children}
      </label>
    </>
  );
};

export default CHeckbox;
