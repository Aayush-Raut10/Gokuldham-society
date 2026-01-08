import { useState, useCallback } from 'react'

export type FormMessage = {
    type: 'success' | 'error' | 'info'
    text: string
}

interface UseFormOptions<T> {
    initialValues: T
    onSubmit?: (values: T) => Promise<void> | void
    onSuccess?: (values: T) => void
    onError?: (error: any) => void
    resetOnSubmit?: boolean
    successMessage?: string
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    onSubmit,
    resetOnSubmit = true,
    successMessage = 'Form submitted successfully!'
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<FormMessage | null>(null)

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target

        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }, [])

    const handleRadioChange = useCallback((
        name: string,
        value: string
    ) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        if (!onSubmit) return

        setIsLoading(true)
        setMessage(null)

        try {
            await onSubmit(values)

            setMessage({ type: 'success', text: successMessage })

            if (resetOnSubmit) {
                setValues(initialValues)
            }
        } catch (error: any) {
            const errorMessage = error?.message || 'An error occurred while submitting the form'

            setMessage({ type: 'error', text: errorMessage })

        } finally {
            setIsLoading(false)
        }
    }, [values, onSubmit, resetOnSubmit, initialValues])

    const reset = useCallback(() => {
        setValues(initialValues)
        setMessage(null)
    }, [initialValues])

    const setFieldValue = useCallback((name: string, value: any) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const clearMessage = useCallback(() => {
        setMessage(null)
    }, [])

    return {
        values,
        setValues,
        handleChange,
        handleRadioChange,
        handleSubmit,
        reset,
        setFieldValue,
        isLoading,
        message,
        setMessage,
        clearMessage
    }
}