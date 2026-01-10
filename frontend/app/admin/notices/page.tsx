'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { fetchData } from '@/services/httpMethods'
import { Delete, Edit, Eye, Search, Calendar, Globe, Lock } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'

interface Notice {
    id: number
    title: string
    description: string
    type: 'public' | 'private'
    image?: string
    createdDate: string
}

const Notices = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [allNotices, setAllNotices] = useState<Notice[]>()

    useEffect(() => {
        const fetchNotices = async () => {
            const res = await fetchData('/api/notices?')
            if (res.success && res.data) {
                setAllNotices(res.data)
            } else {
                setAllNotices([])
            }
        }
        fetchNotices()
    }, [])

    // Filter notices based on search query
    const filteredNotices = useMemo(() => {
        if (!allNotices || !searchQuery.trim()) {
            return allNotices || []
        }

        const query = searchQuery.toLowerCase().trim()
        return allNotices.filter(notice =>
            notice.title.toLowerCase().includes(query) ||
            notice.description.toLowerCase().includes(query) ||
            notice.type.toLowerCase().includes(query)
        )
    }, [searchQuery, allNotices])

    if (!allNotices) {
        return (
            <AdminLayout>
                <div className="text-center py-12 text-gray-500">
                    Loading notices...
                </div>
            </AdminLayout>
        )
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const getTypeBadgeColor = (type: string) => {
        return type === 'public'
            ? 'text-blue-600 bg-blue-100'
            : 'text-purple-600 bg-purple-100'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-5 mb-5">
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>Notices</h1>
                    <p className='text-gray-600 mt-1'>Manage community notices and announcements</p>
                </div>
                <Link href="/admin/notices/add" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <span>Add Notice</span>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-5">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Search by title, description, type, or created by..."
                    />
                </div>
                {searchQuery && (
                    <div className="mt-2 text-sm text-gray-600">
                        Found {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </div>
                )}
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {filteredNotices.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">No notices found</div>
                        <div className="text-gray-500 text-sm">
                            {searchQuery ? 'Try adjusting your search terms' : 'No notices created yet'}
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Title</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredNotices.map((notice) => (
                                    <tr key={notice.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{notice.title}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {notice.description}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                {notice.type === 'public' ? (
                                                    <Globe className="w-4 h-4 text-blue-600" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-purple-600" />
                                                )}
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(notice.type)}`}>
                                                    {notice.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/admin/notices/${notice.id}/view`}
                                                    className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/notices/${notice.id}/edit`}
                                                    className="text-primary hover:text-primary-700 p-1 rounded transition-colors"
                                                    title="Edit Notice"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                                                    title="Delete Notice"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this notice?')) {
                                                            console.log('Delete notice:', notice.id)
                                                        }
                                                    }}
                                                >
                                                    <Delete className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Summary */}
            {filteredNotices.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredNotices.length} of {allNotices.length} notices
                </div>
            )}
        </AdminLayout>
    )
}

export default Notices