import { useEffect, useState } from 'react';

/**
 * debounce를 적용시킨 value를 반환하는 커스텀 훅
 * @param value debounce를 적용시킬 값
 * @param delay 지연 시간 설정(기본값 500ms)
 * @returns
 */
function useDebounce(value: string, delay: number = 500) {
  const [debounceValue, setDebounceValue] = useState<string>(value);
  const korEngNumRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]*$/; // 한글, 영어, 숫자 체크 정규식

  useEffect(() => {
    const timer = setTimeout(() => {
      // 입력한 글자가 한글, 영어, 숫자가 아닌 경우에 값 저장 안함
      if (!korEngNumRegex.test(value)) {
        return null;
      }

      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
