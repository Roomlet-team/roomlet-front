import type { AppProps } from 'next/app';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
// 타임존 설정
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
// import '../features/calendar/styles/styles.css';

// client 생성
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // 기본 타임존 설정
  dayjs.tz.setDefault('Asia/Seoul');

  // 로케일 설정
  dayjs.locale('ko');

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>

      {/* react-query devtools - devtools 폰트 사이즈가 너무 작아서 16px로 설정 */}
      <div className="react-query-devtools" style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}
