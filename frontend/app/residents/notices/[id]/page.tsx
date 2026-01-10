'use client'
import Footer from '@/components/home/Footer'
import Nav from '@/components/home/Nav'
import { fetchData } from '@/services/httpMethods'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const NoticeDetails = () => {
    const params = useParams()
    const router = useRouter()
    const [notice, setNotice] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // fetch notice details by id from API
        const fetchNoticeDetails = async () => {
            const res = await fetchData('/api/notices?type=private');
            if (res.success && res.data) {
                console.log(res);
                const noticeData = res.data.find((n: any) => n.id?.toString() === params.id);
                setNotice(noticeData || null);
            }
            setIsLoading(false);
        }
        fetchNoticeDetails();
    }, [params.id])

    if (isLoading) {
        return (
            <>
                <Nav />
                <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                        <p className="text-lg text-gray-600 font-medium">Loading notice details...</p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    if (!notice) {
        return (
            <>
                <Nav />
                <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
                    <div className="text-center px-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notice Not Found</h2>
                        <p className="text-gray-600 mb-8">The notice you're looking for doesn't exist or has been removed.</p>
                        <button
                            onClick={() => router.push('/residents/notices')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Back to Notices
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Nav />

            {/* Hero Section with Breadcrumb */}
            <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                        <button
                            onClick={() => router.push('/residents')}
                            className="hover:text-blue-600 transition-colors"
                        >
                            Home
                        </button>
                        <span>/</span>
                        <button
                            onClick={() => router.push('/residents/notices')}
                            className="hover:text-blue-600 transition-colors"
                        >
                            Notices
                        </button>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Notice Details</span>
                    </div>

                    {/* Notice Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Official Notice
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {notice?.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 border-l-4 border-blue-600 pl-4 bg-white/50 py-3 rounded-r-lg">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">
                                {notice?.created_at ? new Date(notice.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'Date not available'}
                            </span>
                        </div>
                        {notice?.category && (
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                <span className="text-sm">{notice.category}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    {/* Notice Image */}
                    {notice.image_url && (
                        <div className="mb-12 group">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 group-hover:shadow-3xl">
                                <Image
                                    src={notice.image_url}
                                    alt={notice?.title || 'Notice Details'}
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-linear-to-r from-gray-50 to-blue-50 rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                                Notice Details
                            </h2>
                            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                                {notice?.description}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-12 flex flex-wrap gap-4">
                        <button
                            onClick={() => router.push('/residents/notices')}
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to All Notices
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default NoticeDetails
