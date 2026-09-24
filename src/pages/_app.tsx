
import '../patches/router-patch'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastContainer, toast } from '@/components/ui/Toast'
import { setNotifyImpl } from '@/lib/notify'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Wire the notification bridge once at app startup.
    // Only presentation imports toast; stores/services use @/lib/notify.
    setNotifyImpl(toast)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastContainer />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
