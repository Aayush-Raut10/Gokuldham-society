'use client'
import { useEffect, useState } from 'react'
import Nav from '@/components/home/Nav'
import Footer from '@/components/home/Footer'
import Link from 'next/link'
import { fetchData, submitForm } from '@/services/httpMethods'

interface Complaint {
    id?: number
    category: string
    description: string
    status?: 'pending' | 'in-progress' | 'resolved'
    date?: string
}

const Complaints = () => {
    const [complaint, setComplaint] = useState('')
    const [category, setCategory] = useState('maintenance')
    const [complaintsList, setComplaintsList] = useState<Complaint[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const res = await fetchData('/api/complains')
            if (res.success && res.data) {
                setComplaintsList(res.data)
                console.log(res.data)
            }
        }
        getData();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        const newComplaint = {
            id: Date.now(),
            description: complaint,
            category: category.charAt(0).toUpperCase() + category.slice(1),
        }

        try {
            const res = await submitForm(newComplaint, '/api/complains')

            if (res.success) {
                setComplaintsList([newComplaint, ...complaintsList])
            }
        } catch (error) {
            console.error('Error submitting complaint:', error)
        } finally {
            setLoading(false)
        }

        setComplaint('')
        setCategory('maintenance')
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-orange-100 text-orange-700'
            case 'in-progress':
                return 'bg-blue-100 text-blue-700'
            case 'resolved':
                return 'bg-green-100 text-green-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <>
            <Nav />

            {/* Hero Section */}
            <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/residents" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Complaints</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Complaints & Issues</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Report issues and track their resolution status
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Complaint Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                    File a New Complaint
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                        >
                                            <option value="maintenance">Maintenance</option>
                                            <option value="utilities">Utilities</option>
                                            <option value="security">Security</option>
                                            <option value="cleanliness">Cleanliness</option>
                                            <option value="parking">Parking</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="complaint" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Describe Your Issue
                                        </label>
                                        <textarea
                                            id="complaint"
                                            name={"complaint"}
                                            value={complaint}
                                            onChange={(e) => setComplaint(e.target.value)}
                                            placeholder="Please provide detailed information about your complaint..."
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Submit Complaint
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Guidelines
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    <li className="flex gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Be specific and provide details</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Include location if applicable</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Select the correct category</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>Track status in your dashboard</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Response Time</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Urgent</span>
                                        <span className="font-semibold text-red-600">24 hours</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Normal</span>
                                        <span className="font-semibold text-orange-600">2-3 days</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Low Priority</span>
                                        <span className="font-semibold text-blue-600">5-7 days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Complaints List */}
                    <div className="mt-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                Your Complaints History
                            </h2>

                            {complaintsList.length > 0 ? (
                                <div className="space-y-4">
                                    {complaintsList.map((c) => (
                                        <div
                                            key={c.id}
                                            className="flex flex-col sm:flex-row sm:items-start gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                        {c.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">{c.date}</span>
                                                </div>
                                                <p className="text-gray-900 font-medium mb-1">{c.description}</p>
                                            </div>
                                            {
                                                c.status && (
                                                    <span className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(c.status)}`}>
                                                        {c.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </span>
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500">No complaints filed yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Complaints