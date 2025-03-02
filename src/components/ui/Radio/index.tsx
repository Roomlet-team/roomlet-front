import React, { FC } from 'react';
import styles from './styles/styles.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  key?: React.Key;
  label: string;
  theme?: 'red500' | 'white';
}

const Radio: FC<RadioProps> = (props) => {
  const { id, label, type, theme = 'red500', ...anotherProps } = props;

  return (
    <>
      <label className={`${styles['common-radio-label']} ${styles[theme]}`} htmlFor={id}>
        <input className={`${styles['common-radio-input']} ${styles[theme]}`} type="radio" id={id} {...anotherProps} />
        {label}
      </label>
    </>
  );
};

export default Radio;
