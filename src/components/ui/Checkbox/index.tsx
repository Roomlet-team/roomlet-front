import React, { FC } from 'react';
import styles from './styles/styles.module.css';

interface CHeckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactElement | React.ReactElement[] | string;
  variant?: 'default' | 'circle';
}

const CHeckbox: FC<CHeckboxProps> = (props) => {
  const { id, children, variant = 'default', ...anotherProps } = props;

  const checkboxClass =
    variant === 'circle' ? `${styles['common-checkbox']} ${styles['circle']}` : styles['common-checkbox'];

  return (
    <>
      <label className={styles['common-checkbox-label']} htmlFor={id}>
        {/* 체크박스 */}
        <div className={checkboxClass}>
          <span className={styles['common-checkbox-checkmark']} />
        </div>
        <input className={styles['common-checkbox-input']} type="checkbox" id={id} {...anotherProps} />

        {/* 체크박스 텍스트 */}
        <div className={styles['common-checkbox-text']}>{children}</div>
      </label>
    </>
  );
};

export default CHeckbox;
