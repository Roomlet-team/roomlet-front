import { useCallback, useEffect, useRef } from 'react';

/**
 * 무한 스크롤을 위한 Intersection Observer 커스텀 훅
 * @param onIntersect 인터섹션 콜백
 * @param options 옵션 (기본값: { threshold: 0.1 })
 * @returns
 */
const useIntersectionObserver = (onIntersect: () => void, options?: IntersectionObserverInit) => {
  const targetRef = useRef<HTMLLIElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      ...options,
    });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [callback, options]);

  return targetRef;
};

export default useIntersectionObserver;
