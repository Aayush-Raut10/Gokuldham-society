import Footer from '@/components/home/Footer'
import Nav from '@/components/home/Nav'
import NoticeCard from '@/components/home/NoticeCard'
import { fetchData } from '@/services/httpMethods'

const NoticePage = async () => {

    const res = await fetchData('/api/notices')

    const notices = res.success && res.data ? res.data : []

    return (
        <>
            <Nav />
            <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Public Notices</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Stay informed with the latest updates and announcements for Gokuldham Society residents.
                        </p>
                    </div>
                </div>
            </section>

            <div className="my-12 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notices.map((notice: any) => (
                    <NoticeCard key={notice.id} notice={notice} />
                ))}
            </div>

            <Footer />
        </>
    )
}

export default NoticePage
