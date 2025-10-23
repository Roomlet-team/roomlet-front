import useGlobalRouter from './useGlobalRouter';

/**
 * 직전 페이지로 이동하거나 홈 페이지로 이동하는 함수를 반환하는 커스텀 훅
 */
const useBackNavigation = () => {
  const router = useGlobalRouter();

  const goBackOrHome = () => {
    const referer = document.referrer;

    const allowedDomains = [
      process.env.NEXT_PUBLIC_FRONTEND_URL, // 환경변수로 관리
    ].filter(Boolean);

    const isInternalReferrer = referer && allowedDomains.some((domain) => referer.includes(domain));

    if (isInternalReferrer) {
      router.back();
    } else {
      router.push('/home');
    }
  };

  return { goBackOrHome };
};

export default useBackNavigation;
