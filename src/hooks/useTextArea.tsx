import { useState } from 'react';

/**
 * textarea 태그에서 state 값 변경만 다루는 onChange와 값이 변경된 state를 반환하는 custom hook
 * @param initValue state에 저장할 초기값
 * @returns
 */
function useTextArea<T>(initValue: T): [T, (e: React.ChangeEvent<HTMLTextAreaElement>) => void] {
  const [value, setValue] = useState<T>(initValue);

  const handleTextAreaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value as T);
  };

  return [value, handleTextAreaValue];
}

export default useTextArea;
