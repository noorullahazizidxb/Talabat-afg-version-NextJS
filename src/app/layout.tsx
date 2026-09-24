import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastContainer } from '@/components/ui/Toast'
import { I18nProvider } from '@/utils/i18n/i18nContext'
import { RTLWrapper } from '@/components/i18n/RTLWrapper'
import { AuthProvider } from '@/components/auth/AuthProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Talabat Afghanistan – Food & Delivery',
    template: '%s | Talabat Afghanistan',
  },
  description: 'Order food, groceries, flowers and more. Fast delivery across Afghanistan.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://note-app.devminds.net'),
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Talabat Afghanistan' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f97316' },
    { media: '(prefers-color-scheme: dark)',  color: '#ea580c' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastContainer />
          <I18nProvider initialLanguage="en">
            <RTLWrapper>
              <AuthProvider>
                {children}
              </AuthProvider>
            </RTLWrapper>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
