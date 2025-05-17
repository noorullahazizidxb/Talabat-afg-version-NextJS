import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { I18nProvider } from '../../utils/i18n/i18nContext'
import { RTLWrapper } from '../../components/i18n/RTLWrapper'
import { AuthProvider } from '../../components/auth/AuthProvider'

// Create a custom render function that includes our providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider initialLanguage="en">
      <RTLWrapper>
        <AuthProvider>
          {children}
        </AuthProvider>
      </RTLWrapper>
    </I18nProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything from testing-library
export * from '@testing-library/react'

// Override render method
export { customRender as render }
