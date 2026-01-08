'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { Upload } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm, FormMessage, PageHeader, FormField, TextAreaField } from '@/components/common'
import { submitForm } from '@/services/httpMethods'

interface NoticeFormData {
    title: string
    description: string
    type: 'public' | 'private'
}

const AddNotice = () => {
    const initialValues: NoticeFormData = {
        title: '',
        description: '',
        type: 'public'
    }

    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const {
        values,
        handleChange,
        handleRadioChange,
        handleSubmit,
        isLoading,
        message,
        clearMessage
    } = useForm({
        initialValues,
        onSubmit: async (formData) => {
            const payload = new FormData()
            payload.append('title', formData.title)
            payload.append('description', formData.description)
            payload.append('type', formData.type)
            if (selectedImage) {
                payload.append('image', selectedImage)
            }

            const res = await submitForm(payload, '/api/notices')

            if (!res.success) {
                throw new Error(res.message || 'Failed to add notice')
            }

            setSelectedImage(null)
        },
        resetOnSubmit: true,
        successMessage: 'Notice added successfully!'
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
        }
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleRadioChange('type', e.target.value)
    }

    return (
        <AdminLayout>
            <PageHeader
                title="Add New Notice"
                description="Create a new notice for the community"
                backUrl="/admin/notices"
                backText="Back to Notices"
            />

            {message && (
                <FormMessage
                    type={message.type}
                    message={message.text}
                    onDismiss={clearMessage}
                />
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
                {/* Title Field */}
                <FormField
                    label="Notice Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Enter notice title (e.g., Monthly Maintenance Due)"
                    required
                />

                {/* Description Field */}
                <TextAreaField
                    label="Short Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Enter a brief description of the notice..."
                    required
                    rows={4}
                    maxLength={500}
                    showCount
                />

                {/* Notice Type Radio Buttons */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Notice Type <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                id="public"
                                name="type"
                                type="radio"
                                value="public"
                                checked={values.type === 'public'}
                                onChange={handleTypeChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label htmlFor="public" className="ml-3 block text-sm font-medium text-gray-700">
                                <span className="font-semibold">Public Notice</span>
                                <div className="text-gray-500 text-xs">Visible to all residents and visitors</div>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="private"
                                name="type"
                                type="radio"
                                value="private"
                                checked={values.type === 'private'}
                                onChange={handleTypeChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label htmlFor="private" className="ml-3 block text-sm font-medium text-gray-700">
                                <span className="font-semibold">Private Notice</span>
                                <div className="text-gray-500 text-xs">Visible only to registered residents</div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                        Notice Image
                    </label>

                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary transition-colors">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="image"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                >
                                    <span>Upload an image</span>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            {selectedImage && (<span className="ml-2 text-sm text-gray-500">{selectedImage.name}</span>)}
                        </div>
                    </div>

                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Notice...' : 'Create Notice'}
                    </button>
                    <Link
                        href="/admin/notices"
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    )
}

export default AddNotice