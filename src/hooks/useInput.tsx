import { useState } from 'react';

/**
 * input 태그에서 state 값 변경만 다루는 onChange와 값이 변경된 state를 반환하는 custom hook
 * @param initValue state에 저장할 초기값
 * @returns
 */
function useInput<T>(initValue: T): [T, React.ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState<T>(initValue);

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value as T);
  };

  return [value, handleInputValue];
}

export default useInput;
