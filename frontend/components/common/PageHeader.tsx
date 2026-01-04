import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageHeaderProps {
    title: string
    description?: string
    backUrl?: string
    backText?: string
    actions?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    backUrl,
    backText = 'Back',
    actions
}) => {
    return (
        <div className="mb-6">
            {backUrl && (
                <Link
                    href={backUrl}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {backText}
                </Link>
            )}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-2xl text-gray-900">{title}</h1>
                    {description && (
                        <p className="text-gray-600 mt-1">{description}</p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageHeader