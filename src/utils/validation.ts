/**
 * Validation utility functions for forms
 */

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (basic international format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9]{8,15}$/
  return phoneRegex.test(phone)
}

// Password strength validation (min 8 chars, at least 1 letter and 1 number)
export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegex.test(password)
}

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Required field validation
export const isRequired = (value: any): boolean => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.length > 0
  return true
}

// Min length validation
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min
}

// Max length validation
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max
}

// Number range validation
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

// Create a validator function that returns error messages
export const createValidator = <T extends Record<string, any>>(
  validationRules: Record<keyof T, Array<(value: any) => boolean | string>>
) => {
  return (values: T): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {}
    
    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = values[field]
      
      for (const rule of rules) {
        const result = rule(value)
        
        if (result !== true) {
          errors[field as keyof T] = typeof result === 'string' 
            ? result 
            : `Invalid ${field}`
          break
        }
      }
    })
    
    return errors
  }
}

// Common validation rules
export const validationRules = {
  required: (fieldName: string = 'field') => (value: any): boolean | string => 
    isRequired(value) || `${fieldName} is required`,
    
  email: (value: string): boolean | string => 
    !value || isValidEmail(value) || 'Please enter a valid email address',
    
  phone: (value: string): boolean | string => 
    !value || isValidPhone(value) || 'Please enter a valid phone number',
    
  password: (value: string): boolean | string => 
    !value || isStrongPassword(value) || 'Password must be at least 8 characters with at least 1 letter and 1 number',
    
  url: (value: string): boolean | string => 
    !value || isValidUrl(value) || 'Please enter a valid URL',
    
  min: (min: number, fieldName: string = 'field') => (value: string): boolean | string => 
    !value || minLength(value, min) || `${fieldName} must be at least ${min} characters`,
    
  max: (max: number, fieldName: string = 'field') => (value: string): boolean | string => 
    !value || maxLength(value, max) || `${fieldName} must be at most ${max} characters`,
    
  range: (min: number, max: number, fieldName: string = 'field') => (value: number): boolean | string => 
    value === undefined || value === null || isInRange(value, min, max) || `${fieldName} must be between ${min} and ${max}`,
    
  match: (matchField: string, matchFieldName: string, values: Record<string, any>) => (value: string): boolean | string => 
    value === values[matchField] || `Must match ${matchFieldName}`,
    
  passwordMatch: (passwordField: string = 'password') => (value: any, allValues?: Record<string, any>): boolean | string => {
    if (!allValues) return true;
    return value === allValues[passwordField] || 'Passwords must match';
  }
}
