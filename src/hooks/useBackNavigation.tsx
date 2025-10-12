import { useRouter } from 'next/router';

/**
 * 직전 페이지로 이동하거나 홈 페이지로 이동하는 함수를 반환하는 커스텀 훅
 */
const useBackNavigation = () => {
  const router = useRouter();

  const goBackOrHome = () => {
    // 1. referrer 체크
    const referrer = document.referrer;
    const allowedDomains = [
      process.env.NEXT_PUBLIC_FRONTEND_URL, // 환경변수로 관리
    ].filter(Boolean);

    const isInternalReferrer = referrer && allowedDomains.some((domain) => referrer.includes(domain));

    // 2. 히스토리 길이 체크 (추가 안전장치)
    const hasHistory = window.history.length > 1;

    // 3. Next.js 라우터 히스토리 체크 (가장 안전)
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
