'use client'
import formatDate from '@/utils/formatDate'
import Link from 'next/link'
import { useEffect } from 'react';

type NoticeType = {
    id: number;
    title: string;
    description: string;
    link: string;
    date: string;
}

const NoticeCard = ({ notice }: { notice: NoticeType }) => {

    useEffect(() => {
        localStorage.setItem('notice', JSON.stringify(notice));
    }, []);

  return (
      <div
          key={notice.id}
          className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      >

          {/* Type Icon and Date */}
          <div className="flex items-center gap-3 mb-4">
              <div className="text-sm text-gray-500">
                  {formatDate(notice.date)}
              </div>
          </div>

          {/* Title */}
          <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {notice.title}
          </h4>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">
              {notice.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">

              <Link
                  href={`/notices/${notice.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
              >
                  View Details
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
              </Link>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
  )
}

export default NoticeCard
