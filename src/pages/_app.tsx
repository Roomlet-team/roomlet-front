import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import '@assets/global.css';
import '@assets/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../features/authentication/assets/onboarding-slider.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
