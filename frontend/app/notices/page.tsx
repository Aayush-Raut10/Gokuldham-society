import Footer from '@/components/home/Footer'
import Nav from '@/components/home/Nav'
import NoticeCard from '@/components/home/NoticeCard'
import { fetchData } from '@/services/httpMethods'

const NoticePage = async () => {

    const res = await fetchData('/api/notices?type=public')

    const notices = res.success && res.data ? res.data : []

    return (
        <>
            <Nav />

            {/* Hero Section */}
            <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-12">
                        {/* Icon Badge */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Public Notices
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Stay informed with the latest updates and announcements for Gokuldham Society residents.
                        </p>
                    </div>
                </div>
            </section>

            {/* Notices Grid Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    {notices.length > 0 ? (
                        <>
                            {/* Section Header */}
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                                    <span className="w-1.5 h-10 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                    Latest Updates
                                </h2>
                                <p className="text-gray-600 ml-6">Browse through all important announcements and notices</p>
                            </div>

                            {/* Notices Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {notices.map((notice: any) => (
                                    <NoticeCard key={notice.id} notice={notice} />
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Notices Available</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-8">
                                There are currently no active notices. Check back later for important updates and announcements.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-indigo-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Stay Connected
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Never miss an important update. Subscribe to notifications for real-time alerts.
                    </p>
                    <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Enable Notifications
                    </button>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default NoticePage
