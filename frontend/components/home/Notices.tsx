'use client';
import Link from "next/link";
import NoticeCard from "./NoticeCard";
import { fetchData } from "@/services/httpMethods";
import { useEffect, useState } from "react";

const Notices = () => {

    const fetchNotices = async () => {
        const result = localStorage.getItem('notices');
        if (result) {
            return JSON.parse(result);
        }
        else {
            const res = await fetchData('/api/notices');
            localStorage.setItem('notices', JSON.stringify(res));
            return res;
        }
    }

    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchNotices().then((res) => {
            setNotices(res.data || []);
            setLoading(false);
        });
    }, []);

    if (notices.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Public Notices</h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay informed with the latest updates and announcements for Gokuldham Society residents.
                    </p>
                </div>

                {
                    loading ? (
                        <div className="text-center text-gray-500">
                            Loading notices...
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {notices.map((notice) => (
                                    <NoticeCard key={notice.id} notice={notice} />
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    href="/notices"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                                >
                                    View All Notices
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default Notices
