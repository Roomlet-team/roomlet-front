import React, { FC } from 'react';
import styles from './styles/styles.module.css';

type RadioProps = {
  id: string;
  label: string;
  checked?: boolean;
  name: string;
  onChange: () => void;
};

const Radio: FC<RadioProps> = (props) => {
  const { id, label, name, checked, onChange } = props;

  return (
    <>
      <input
        className={styles['common-radio-input']}
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className={styles['common-radio-label']} htmlFor={id}>
        {label}
      </label>
    </>
  );
};

export default Radio;
