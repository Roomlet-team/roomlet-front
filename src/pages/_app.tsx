import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
// 타임존 설정
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// react-query
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// redux
import { Provider } from 'react-redux';
import { store } from '../store';
// etc
import '@assets/global.css';
import '@assets/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../features/authentication/assets/onboarding-slider.css';
import '../features/booking/assets/custom-react-calendar.css';
import '../features/calendar/styles/custom-react-calendar.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
// import '../features/calendar/styles/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // staleTime: 60 * 1000,
          },
        },
      })
  );

  dayjs.extend(utc);
  dayjs.extend(timezone);

  // 기본 타임존 설정
  dayjs.tz.setDefault('Asia/Seoul');

  // 로케일 설정
  dayjs.locale('ko');

  // sessionStorage에 referer 저장
  useEffect(() => {
    const tempReferer = document.cookie
      .split('; ')
      .find((row) => row.startsWith('page_referer='))
      ?.split('=')[1];

    if (tempReferer) {
      sessionStorage.setItem('referer', decodeURIComponent(tempReferer));

      // 쿠키 삭제
      document.cookie = 'page_referer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } else {
      // 외부 페이지로 부터 온 경우, 세션 스토리지에 저장되어 있던 기존 referer 삭제
      sessionStorage.removeItem('referer');
    }
  }, [router.asPath]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Provider store={store}>
          <ToastContainer />
          <Component {...pageProps} />
        </Provider>
      </HydrationBoundary>

      {/* react-query devtools - devtools 폰트 사이즈가 너무 작아서 16px로 설정 */}
      <div className="react-query-devtools" style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
