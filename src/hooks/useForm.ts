import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  onSubmit: (values: T) => void | Promise<void>
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

/**
 * Custom hook for handling form state and validation
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      
      // Handle checkbox inputs
      if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked
        setValues(prev => ({ ...prev, [name]: checked }))
        return
      }
      
      // Handle number inputs
      if (type === 'number') {
        const numberValue = value === '' ? '' : Number(value)
        setValues(prev => ({ ...prev, [name]: numberValue }))
        return
      }
      
      // Handle all other inputs
      setValues(prev => ({ ...prev, [name]: value }))
    },
    []
  )

  // Set a specific field value programmatically
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }, [])

  // Mark a field as touched when it's blurred
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    // Validate on blur if validate function exists
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  }, [validate, values])

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof T, boolean>
      )
      setTouched(allTouched as Partial<Record<keyof T, boolean>>)
      
      // Validate if validate function exists
      if (validate) {
        const validationErrors = validate(values)
        setErrors(validationErrors)
        
        // Don't submit if there are errors
        if (Object.keys(validationErrors).length > 0) {
          return
        }
      }
      
      // Submit the form
      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit, validate, values]
  )

  // Reset the form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm
  }
}
