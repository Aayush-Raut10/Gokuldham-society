import React from 'react'

interface FormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'select';
    options?: { value: string; label: string }[]; // for select type
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    options = [],
    value,
    onChange,
    placeholder,
    required = false,
    error,
    disabled = false,
    className = ''
}) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {
                type === 'select' ? (
                    <select
                        id={name}
                        name={name}
                        onChange={onChange}
                        required={required}
                        defaultValue={value}
                        disabled={disabled}
                        className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300'
                            } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    >
                        <option value="">{placeholder || 'Select an option'}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300'
                            } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    />
                )
            }
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}

interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    rows?: number;
    maxLength?: number;
    showCount?: boolean;
    className?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error,
    disabled = false,
    rows = 3,
    maxLength,
    showCount = false,
    className = ''
}) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300'
                    } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {showCount && maxLength && (
                <div className="mt-1 text-sm text-gray-500 text-right">
                    {value.length}/{maxLength} characters
                </div>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    error,
    disabled = false,
    placeholder = 'Select an option',
    className = ''
}) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300'
                    } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}