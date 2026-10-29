import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import { I18nProvider } from '@/utils/i18n/i18nContext'
import { RTLWrapper } from '@/components/i18n/RTLWrapper'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Footer from '@/components/Footer'
import { ThemeTokensProvider } from '@/theme/ThemeTokensProvider'
import { createThemeBootstrapScript } from '@/theme/theme-runtime'
import { readThemeTokenFileSync } from '@/theme/theme-token-server'

const inter = Inter({ subsets: ['latin'] })
const themeTokenFile = readThemeTokenFileSync()
const themeBootstrapScript = createThemeBootstrapScript(themeTokenFile)

export const metadata: Metadata = {
  title: 'Talabat - Food Delivery',
  description: 'Order food online from your favorite restaurants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="talabat-theme-bootstrap-app"
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body className={inter.className}>
        <ThemeTokensProvider initialThemeFile={themeTokenFile}>
          <I18nProvider initialLanguage="en">
            <RTLWrapper>
              <AuthProvider>
                <Layout>
                  {children}
                  <Footer />
                </Layout>
              </AuthProvider>
            </RTLWrapper>
          </I18nProvider>
        </ThemeTokensProvider>
      </body>
    </html>
  )
}
