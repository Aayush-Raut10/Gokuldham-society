'use client'
import { useState } from 'react'
import Nav from '@/components/home/Nav'
import Footer from '@/components/home/Footer'
import Link from 'next/link'

interface PaymentHistory {
    id: number
    month: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
    date: string
    type: string
}

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState<number | null>(null)

    const paymentHistory: PaymentHistory[] = [
        { id: 1, month: 'January 2026', amount: 5000, status: 'pending', date: 'Due: Jan 10, 2026', type: 'Maintenance' },
        { id: 2, month: 'December 2025', amount: 5000, status: 'paid', date: 'Paid: Dec 8, 2025', type: 'Maintenance' },
        { id: 3, month: 'November 2025', amount: 5000, status: 'paid', date: 'Paid: Nov 5, 2025', type: 'Maintenance' },
        { id: 4, month: 'October 2025', amount: 5000, status: 'paid', date: 'Paid: Oct 7, 2025', type: 'Maintenance' },
    ]

    const pendingAmount = paymentHistory.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-700'
            case 'pending':
                return 'bg-orange-100 text-orange-700'
            case 'overdue':
                return 'bg-red-100 text-red-700'
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
                        <span className="text-gray-900 font-medium">Payments</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-600 to-teal-600 rounded-3xl mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Payments</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Manage your maintenance fees and payment history
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    {/* Payment Summary Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold opacity-90">Pending Amount</h3>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-4xl font-bold mb-2">₹{pendingAmount.toLocaleString()}</div>
                            <p className="text-sm opacity-90">Due this month</p>
                        </div>

                        <div className="bg-linear-to-br from-green-500 to-teal-500 rounded-2xl p-8 text-white shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold opacity-90">Payment Status</h3>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-4xl font-bold mb-2">Up to Date</div>
                            <p className="text-sm opacity-90">Last payment: Dec 8, 2025</p>
                        </div>
                    </div>

                    {/* Payment Action */}
                    <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 mb-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Make a Payment</h2>
                                <p className="text-gray-600">Pay your maintenance fees securely online</p>
                            </div>
                            <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Pay Now ₹{pendingAmount.toLocaleString()}
                            </button>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                            Payment History
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Period</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Amount</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.map((payment) => (
                                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4 font-medium text-gray-900">{payment.month}</td>
                                            <td className="py-4 px-4 text-gray-600">{payment.type}</td>
                                            <td className="py-4 px-4 font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-gray-600 text-sm">{payment.date}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                {payment.status === 'paid' ? (
                                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        Receipt
                                                    </button>
                                                ) : (
                                                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Pay
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Payment