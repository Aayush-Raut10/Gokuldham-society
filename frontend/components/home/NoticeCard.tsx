'use client'
import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';

type NoticeType = {
    id: number;
    title: string;
    description: string;
    link: string;
    date: string;
    image_url?: string;
    category?: string;
}

const NoticeCard = ({ notice }: { notice: NoticeType }) => {
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        localStorage.setItem('notice', JSON.stringify(notice));
    }, [notice]);

    return (
        <div
            key={notice.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Section */}
            {notice.image_url && (
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                    <Image
                        src={notice.image_url}
                        alt={notice.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    {notice.category && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
                            {notice.category}
                        </div>
                    )}
                </div>
            )}

            {/* Content Section */}
            <div className="p-6">
                {/* Date Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(notice.date)}
                    </div>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {notice.title}
                </h4>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {notice.description}
                </p>

                {/* Footer with CTA */}
                <div className="pt-4 border-t border-gray-100">
                    <Link
                        href={`/notices/${notice.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-all group/link"
                    >
                        <span>Read Full Notice</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

            {/* Corner Badge (New/Important) */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                NOTICE
            </div>
        </div>
    )
}

export default NoticeCard
