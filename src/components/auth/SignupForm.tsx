'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import { getSafePath } from '@/utils/navigation'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { useUserStore, userActions } from '@/store/userStore'
import { useForm } from '@/hooks/useForm'
import { validationRules, createValidator } from '@/utils/validation'
import { analytics } from '@/utils/analytics'

interface SignupFormProps {
  onSuccess?: () => void
  redirectPath?: string
  className?: string
}

export function SignupForm({ onSuccess, redirectPath = '/', className }: SignupFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form validation
  const validator = createValidator({
    firstName: [
      validationRules.required('First name'),
      validationRules.max(50, 'First name')
    ],
    lastName: [
      validationRules.required('Last name'),
      validationRules.max(50, 'Last name')
    ],
    email: [
      validationRules.required('Email'),
      validationRules.email
    ],
    phone: [
      validationRules.phone
    ],
    password: [
      validationRules.required('Password'),
      validationRules.password
    ],
    confirmPassword: [
      validationRules.required('Confirm password')
    ]
  })
  
  // Custom validator that extends the base validator to check password confirmation
  const validateForm = (values: any) => {
    const errors = validator(values);
    
    // Add password confirmation validation
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    
    return errors;
  }
  
  const { 
    values, 
    errors, 
    touched,
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    validate: validateForm,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        
        // Track signup attempt
        analytics.trackEvent('signup', {
          method: 'email'
        })
        
        const success = await userActions.register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password
        })
        
        if (success) {
          if (onSuccess) {
            onSuccess()
          } else if (redirectPath) {
            // Ensure redirectPath is a string
            const safePath = getSafePath(redirectPath, '/')
            router.push(safePath)
          }
        }
      } catch (error) {
        console.error('Registration error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  })
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
            required
            leftIcon={<User className="h-4 w-4 text-gray-500" />}
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName ? errors.firstName : undefined}
            fullWidth
            autoComplete="given-name"
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
            required
            leftIcon={<User className="h-4 w-4 text-gray-500" />}
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName ? errors.lastName : undefined}
            fullWidth
            autoComplete="family-name"
          />
        </div>
        
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
          label="Phone Number (optional)"
          name="phone"
          type="tel"
          placeholder="+1234567890"
          leftIcon={<Phone className="h-4 w-4 text-gray-500" />}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone ? errors.phone : undefined}
          fullWidth
          autoComplete="tel"
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
          helperText="Password must be at least 8 characters with at least 1 letter and 1 number"
          fullWidth
          autoComplete="new-password"
        />
        
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          required
          leftIcon={<Lock className="h-4 w-4 text-gray-500" />}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          fullWidth
          autoComplete="new-password"
        />
      </div>
      
      <div className="mt-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        className="mt-6"
      >
        Create Account
      </Button>
    </form>
  )
}
