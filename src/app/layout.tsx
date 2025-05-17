import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import { I18nProvider } from '@/utils/i18n/i18nContext'
import { RTLWrapper } from '@/components/i18n/RTLWrapper'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider initialLanguage="en">
          <RTLWrapper>
            <AuthProvider>
              <Layout>
                {children}
                <Footer/>
              </Layout>
            </AuthProvider>
          </RTLWrapper>
        </I18nProvider>
      </body>
    </html>
  )
}
