import React from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type MessageType = 'success' | 'error' | 'info' | 'warning'

interface FormMessageProps {
    type: MessageType
    message: string
    onDismiss?: () => void
    dismissible?: boolean
}

const FormMessage: React.FC<FormMessageProps> = ({
    type,
    message,
    onDismiss,
    dismissible = true
}) => {
    const getMessageStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800'
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800'
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800'
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800'
        }
    }

    const getIcon = () => {
        const iconClass = 'w-5 h-5 mr-3 flex-shrink-0'

        switch (type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-green-500`} />
            case 'error':
                return <AlertCircle className={`${iconClass} text-red-500`} />
            case 'warning':
                return <AlertCircle className={`${iconClass} text-yellow-500`} />
            case 'info':
            default:
                return <Info className={`${iconClass} text-blue-500`} />
        }
    }

    return (
        <div className={`border rounded-lg p-4 mb-4 ${getMessageStyles()}`}>
            <div className="flex items-start">
                {getIcon()}
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                {dismissible && onDismiss && (
                    <button
                        onClick={onDismiss}
                        className="shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default FormMessage