'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const AddFlat = () => {

    const [formData, setFormData] = useState({
        flatNumber: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Here you would typically send the data to your backend
        console.log('Form Data:', formData)

        // Reset form
        setFormData({
            flatNumber: ''
        })
    }

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
                    <h1 className='font-bold text-2xl text-gray-900'>Add New Flat</h1>
                    <p className='text-gray-600 mt-1'>Create a new flat for the community</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Flat Number
                        </label>
                        <input
                            type="text"
                            name="flatNumber"
                            value={formData.flatNumber}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter flat number"
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                    >
                        Add Flat
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

export default AddFlat