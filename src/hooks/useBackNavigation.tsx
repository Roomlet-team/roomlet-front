import { useRouter } from 'next/router';

/**
 * 직전 페이지로 이동하거나 홈 페이지로 이동하는 함수를 반환하는 커스텀 훅
 */
const useBackNavigation = () => {
  const router = useRouter();

  const goBackOrHome = () => {
    const referer = sessionStorage.getItem('referer');

    const allowedDomains = [
      process.env.NEXT_PUBLIC_FRONTEND_URL, // 환경변수로 관리
    ].filter(Boolean);

    const isInternalReferrer = referer && allowedDomains.some((domain) => referer.includes(domain));

    const hasHistory = window.history.length > 1;

    const canGoBack = router.asPath !== router.pathname || hasHistory;

    if (isInternalReferrer && canGoBack) {
      router.back();
    } else {
      router.push('/home');
    }
  };

  return { goBackOrHome };
};

export default useBackNavigation;
