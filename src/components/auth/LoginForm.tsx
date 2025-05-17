'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { getSafePath } from '@/utils/navigation'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { useUserStore, userActions } from '@/store/userStore'
import { useForm } from '@/hooks/useForm'
import { validationRules, createValidator } from '@/utils/validation'
import { analytics } from '@/utils/analytics'

interface LoginFormProps {
  onSuccess?: () => void
  redirectPath?: string
  className?: string
}

export function LoginForm({ onSuccess, redirectPath = '/', className }: LoginFormProps) {
  const router = useRouter()
  const { isLoading } = useUserStore()
  const [showPassword, setShowPassword] = useState(false)
  
  // Form validation
  const validator = createValidator({
    email: [
      validationRules.required('Email'),
      validationRules.email
    ],
    password: [
      validationRules.required('Password'),
      validationRules.min(6, 'Password')
    ]
  })
  
  const { 
    values, 
    errors, 
    touched,
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: validator,
    onSubmit: async (values) => {
      // Track login attempt
      analytics.trackEvent('login', {
        method: 'email'
      })
      
      const success = await userActions.login(values.email, values.password)
      
      if (success) {
        if (onSuccess) {
          onSuccess()
        } else if (redirectPath) {
          // Ensure redirectPath is a string
          const safePath = getSafePath(redirectPath, '/')
          router.push(safePath)
        }
      }
    }
  })
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          leftIcon={<Mail className="h-4 w-4 text-gray-500" />}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
          fullWidth
          autoComplete="email"
        />
        
        <FormInput
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          required
          leftIcon={<Lock className="h-4 w-4 text-gray-500" />}
          rightIcon={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
          fullWidth
          autoComplete="current-password"
        />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            Forgot your password?
          </a>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading['login']}
        className="mt-6"
      >
        Sign in
      </Button>
    </form>
  )
}
