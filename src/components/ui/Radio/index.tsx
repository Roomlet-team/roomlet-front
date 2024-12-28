import React, { FC } from 'react';
import styles from './styles/styles.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  key?: React.Key;
  label: string;
}

const Radio: FC<RadioProps> = (props) => {
  const { id, label, type, ...anotherProps } = props;

  return (
    <>
      <label className={styles['common-radio-label']} htmlFor={id}>
        <input className={styles['common-radio-input']} type="radio" id={id} {...anotherProps} />
        {label}
      </label>
    </>
  );
};

export default Radio;
