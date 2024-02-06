import type { AppProps } from 'next/app';
import '@assets/global.css';
import '@assets/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../features/authentication/assets/onboarding-slider.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
