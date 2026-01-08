'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { FormMessage, useForm } from '@/components/common'
import { updateForm } from '@/services/httpMethods'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

const EditFlat = () => {

    const initialValues = {
        flatNumber: ''
    }

    const params = useParams()

    const {
        handleSubmit,
        values,
        setValues,
        handleChange,
        isLoading,
        message,
        clearMessage
    } = useForm({
        initialValues,
        onSubmit: async (data) => {
            const payload = {
                "flatid": data.flatNumber
            }
            const res = await updateForm(payload, `/api/flats/${params.id}`)

            if (!res.success) {
                throw new Error(res.message || 'Failed to add flat')
            }

            setTimeout(() => {
                window.location.href = '/admin/flats'
            }, 1500)
        },
        resetOnSubmit: false,
        successMessage: 'Flat updated successfully! Redirecting...'
    })

    // should fetch from API to get existing flat data and populate the form
    // but for now, just set the flat number from params
    useEffect(() => {
        setValues({ flatNumber: params.id as string })
    }, [params.id, setValues])

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link
                    href="/admin/flats"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Flats
                </Link>
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>Update Flat</h1>
                    <p className='text-gray-600 mt-1'>Update the flat information</p>
                </div>
            </div>

            {
                message && (
                    <FormMessage
                        type={message.type}
                        message={message.text}
                        onDismiss={clearMessage}
                    />
                )
            }

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Flat Number
                        </label>
                        <input
                            type="text"
                            name="flatNumber"
                            value={values.flatNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter flat number"
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                    >
                        {isLoading ? 'Updating...' : 'Update Flat'}
                    </button>
                    <Link
                        href="/admin/flats"
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    )
}

export default EditFlat