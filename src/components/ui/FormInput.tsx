'use client'

import { forwardRef } from 'react'
import { cn } from '../../utils/theme'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  helperTextClassName?: string
  errorClassName?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      leftIcon,
      rightIcon,
      containerClassName,
      labelClassName,
      inputClassName,
      helperTextClassName,
      errorClassName,
      id,
      required,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div 
        className={cn(
          'flex flex-col space-y-1.5',
          fullWidth && 'w-full',
          containerClassName
        )}
      >
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-gray-700 dark:text-gray-300',
              required && 'after:content-["*"] after:ml-0.5 after:text-error-500',
              disabled && 'opacity-50 cursor-not-allowed',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error-500 focus:ring-error-500',
              fullWidth && 'w-full',
              inputClassName,
              className
            )}
            required={required}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className={cn(
              'text-xs text-gray-500 dark:text-gray-400',
              helperTextClassName
            )}
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            id={`${inputId}-error`}
            className={cn(
              'text-xs text-error-500 dark:text-error-400',
              errorClassName
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export { FormInput }
