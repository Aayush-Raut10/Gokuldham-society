'use client'
import Nav from '@/components/home/Nav'
import Footer from '@/components/home/Footer'
import Link from 'next/link'

const ResidentDashboard = () => {
    // Mock data - replace with actual API calls
    const residentData = {
        name: 'John Doe',
        flatNumber: 'A-101',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        memberSince: 'January 2020'
    }

    const stats = [
        { label: 'Pending Payments', value: 'Rs. 5,000', icon: '💰', color: 'from-orange-500 to-red-500' },
        { label: 'Active Complaints', value: '2', icon: '📋', color: 'from-blue-500 to-indigo-500' },
        { label: 'Upcoming Events', value: '3', icon: '📅', color: 'from-green-500 to-teal-500' },
        { label: 'Internal Notices', value: '10', icon: '📢', color: 'from-purple-500 to-pink-500' }
    ]

    // fetch recent notices - 6 most recent
    const recentNotices = [
        { id: 1, title: 'Water Supply Interruption', description: 'There will be a water supply interruption due to maintenance work.', image_url: 'http://', date: '2024-06-15' },
        { id: 2, title: 'Water Supply Interruption', description: 'There will be a water supply interruption due to maintenance work.', image_url: 'http://', date: '2024-06-15' },
        { id: 3, title: 'Water Supply Interruption', description: 'There will be a water supply interruption due to maintenance work.', image_url: 'http://', date: '2024-06-15' },
        { id: 4, title: 'Water Supply Interruption', description: 'There will be a water supply interruption due to maintenance work.', image_url: 'http://', date: '2024-06-15' },
        { id: 5, title: 'Water Supply Interruption', description: 'There will be a water supply interruption due to maintenance work.', image_url: 'http://', date: '2024-06-15' },
        { id: 6, title: 'Water Supply Interruption', description: 'There will be a water supply interruption due to maintenance work.', image_url: 'http://', date: '2024-06-15' },
    ]

    return (
        <>
            <Nav />

            {/* Hero Section */}
            <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                                Welcome Back, {residentData.name.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-xl text-gray-600">
                                Flat {residentData.flatNumber} • Gokuldham Society
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/residents/notices"
                                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-medium flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Notices
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`text-4xl w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-stretch">
                        {/* Left Column - Quick Actions */}
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                    Quick Actions
                                </h2>
                                <div className="space-y-3">
                                    <Link
                                        href="/residents/complaints"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">File Complaint</div>
                                            <div className="text-sm text-gray-600">Report an issue</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>

                                    <Link
                                        href="/residents/payment"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-all duration-200 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">Make Payment</div>
                                            <div className="text-sm text-gray-600">Pay maintenance</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>

                                    <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group">
                                        <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-semibold text-gray-900">Contact Admin</div>
                                            <div className="text-sm text-gray-600">Get help</div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Profile Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span className="text-gray-600">Flat {residentData.flatNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-600">{residentData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-gray-600">{residentData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-600">Member since {residentData.memberSince}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Recent Notices */}
                        <div className="lg:col-span-2 w-full">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
                                <div className="p-6 shrink-0">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                        Recent Notices
                                    </h2>
                                </div>
                                <div className="px-6 pb-6 overflow-y-auto flex-1">
                                    <div className="space-y-4">
                                        {recentNotices.map((notice) => (
                                            <div
                                                key={notice.id}
                                                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{notice.date}</p>
                                                </div>
                                                <Link
                                                    href={`/residents/notices/${notice.id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    View Notice
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default ResidentDashboard