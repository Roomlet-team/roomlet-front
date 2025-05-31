import { useEffect, useState } from 'react';

/**
 * input 태그에서 checked 상태 값 변경만 다루는 onChange와 값이 변경된 checked 상태를 반환하는 custom hook
 * @param initValue state에 저장할 초기 체크 상태 값
 * @returns
 */
function useInputCheckbox(initValue: boolean): [boolean, React.ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState<boolean>(initValue);

  // initValue가 변경되면 value에도 함께 반영
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log('e.target.checked', e.target.checked);
    setValue(e.target.checked);
  };

  return [value, handleInputValue];
}

export default useInputCheckbox;
