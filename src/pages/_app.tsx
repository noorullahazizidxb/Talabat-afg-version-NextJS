import '../patches/router-patch';
import type { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import '../styles/globals.css';
import { ThemeTokensProvider } from '@/theme/ThemeTokensProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeTokensProvider>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </ThemeTokensProvider>
  );
}

export default MyApp;
