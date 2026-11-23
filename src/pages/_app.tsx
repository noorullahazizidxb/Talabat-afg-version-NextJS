
import '../patches/router-patch';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeTokensProvider } from '@/theme/ThemeTokensProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeTokensProvider>
      <Component {...pageProps} />
    </ThemeTokensProvider>
  );
}

export default MyApp;
      