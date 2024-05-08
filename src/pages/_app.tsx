import type { AppProps } from 'next/app';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
// 타임존 설정
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
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

export default function App({ Component, pageProps }: AppProps) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // 기본 타임존 설정
  dayjs.tz.setDefault('Asia/Seoul');

  // 로케일 설정
  dayjs.locale('ko');

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
