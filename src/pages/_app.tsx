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
import Head from 'next/head';
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

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Provider store={store}>
          <Head>
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
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
