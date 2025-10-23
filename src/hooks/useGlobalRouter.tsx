import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';

/**
 * 전역 설정을 위해 커스텀한 next/router의 useRouter 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `push`: 페이지 이동 함수
 *   - `replace`: 페이지 교체 함수
 *   - 이 외 반환되는 객체는 next/router의 useRouter 훅과 동일
 */
function useGlobalRouter() {
  const router = useRouter();

  const push = (url: Url, as?: Url, options?: any) => {
    return router.push(url, as, {
      scroll: true,
      shallow: false,
      ...options, // 개별 호출에서 덮어쓰기 가능
    });
  };

  const replace = (url: Url, as?: Url, options?: any) => {
    return router.replace(url, as, {
      scroll: true,
      shallow: false,
      ...options,
    });
  };

  return {
    ...router,
    push,
    replace,
  };
}

export default useGlobalRouter;
