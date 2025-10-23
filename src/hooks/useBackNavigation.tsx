import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/**
 * 직전 페이지로 이동하거나 홈 페이지로 이동하는 함수를 반환하는 커스텀 훅
 */
const useBackNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sessionStorage.setItem('previousPath', url);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  const goBackOrHome = () => {
    const previousPath = sessionStorage.getItem('previousPath');
    if (!previousPath) {
      return router.push('/home');
    }

    return router.back();
  };

  return { goBackOrHome };
};

export default useBackNavigation;
