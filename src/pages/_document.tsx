import Document, { Head, Html, Main, NextScript } from 'next/document';

import { createThemeBootstrapScript } from '@/theme/theme-runtime';
import { readThemeTokenFileSync } from '@/theme/theme-token-server';

class TalabatDocument extends Document {
  render() {
    const themeFile = readThemeTokenFileSync();
    const bootstrapScript = createThemeBootstrapScript(themeFile);

    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <script
            id="talabat-theme-bootstrap"
            dangerouslySetInnerHTML={{ __html: bootstrapScript }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default TalabatDocument;
