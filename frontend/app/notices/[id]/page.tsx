'use client'
import Footer from '@/components/home/Footer'
import Nav from '@/components/home/Nav'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const NoticeDetails = () => {

    const params = useParams()

    const [notice, setNotice] = useState<any>(null)

    useEffect(() => {
        const result = localStorage.getItem('notice');
        if (result) {
            const noticeData = JSON.parse(result);
            if (noticeData.id.toString() === params.id) {
                setNotice(noticeData);
            }
        }

    }, [params.id])

    if (!notice) {
        return (
            <>
                <Nav />
                <div className="text-center py-12 text-gray-500">
                    Loading notice details...
                </div>
                <Footer />
            </>
        )
    }

    console.log('Notice Details:', notice.image_url);

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

            <div className="my-12 max-w-7xl mx-auto">

                <h1 className='font-bold text-3xl'>
                    {notice?.title}
                </h1>

                <p className='my-4'>
                    {notice?.description}
                </p>

                <Image
                    src={notice.image_url}
                    alt={notice?.title || 'Notice Details'}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-lg"
                />
            </div>

            <Footer />
        </>
    )
}

export default NoticeDetails
