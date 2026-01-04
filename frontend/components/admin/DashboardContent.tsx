import React from 'react'
import { LucideIcon, Users, Megaphone, DollarSign, ClipboardList, User, BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link';

const StatsCard: React.FC<{ title: string; value: string; icon: LucideIcon; change?: string; changeType?: 'increase' | 'decrease' }> = ({
    title,
    value,
    icon: Icon,
    change,
    changeType = 'increase'
}) => (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 mb-2">{value}</p>
                {change && (
                    <p className={`text-sm flex items-center ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                        {changeType === 'increase' ? <TrendingUp className="w-4 h-4 mr-1 shrink-0" /> : <TrendingDown className="w-4 h-4 mr-1 shrink-0" />}
                        <span className="truncate">{change}</span>
                    </p>
                )}
            </div>
            <div className="text-gray-400 shrink-0 ml-3">
                <Icon className="w-8 h-8" />
            </div>
        </div>
    </div>
)

const DashboardContent: React.FC = () => {
    const recentNotices = [
        { id: 1, title: 'Monthly Maintenance Due', date: '2026-01-04', priority: 'high' },
        { id: 2, title: 'Community Meeting Scheduled', date: '2026-01-03', priority: 'medium' },
        { id: 3, title: 'Gym Renovation Complete', date: '2026-01-02', priority: 'low' },
    ]

    const recentComplaints = [
        { id: 1, title: 'Elevator not working', status: 'pending', flat: 'A-501' },
        { id: 2, title: 'Water supply issue', status: 'resolved', flat: 'B-203' },
        { id: 3, title: 'Parking space conflict', status: 'in-progress', flat: 'C-101' },
    ]

    return (
        <div className="space-y-5">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                <StatsCard
                    title="Total Residents"
                    value="248"
                    icon={Users}
                />
                <StatsCard
                    title="Active Notices"
                    value="12"
                    icon={Megaphone}
                />
                <StatsCard
                    title="Pending Payments"
                    value="रू 1,24,500"
                    icon={DollarSign}
                />
                <StatsCard
                    title="Open Complaints"
                    value="8"
                    icon={ClipboardList}
                />
            </div>

            {/* Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Notices */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Notices</h3>
                        <Link href="/admin/notices" className="text-primary hover:text-primary-700 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentNotices.map((notice) => (
                            <div key={notice.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div>
                                    <h4 className="font-medium text-gray-900">{notice.title}</h4>
                                    <p className="text-sm text-gray-500">{notice.date}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Complaints */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
                        <Link href="/admin/complaints" className="text-primary hover:text-primary-700 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentComplaints.map((complaint) => (
                            <div key={complaint.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div>
                                    <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                                    <p className="text-sm text-gray-500">Flat: {complaint.flat}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                    complaint.status === 'in-progress' ? 'bg-primary-100 text-primary-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {complaint.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Megaphone className="w-8 h-8 mb-2 text-gray-600" />
                        <span className="text-sm font-medium">Add Notice</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <User className="w-8 h-8 mb-2 text-gray-600" />
                        <span className="text-sm font-medium">Add Resident</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <DollarSign className="w-8 h-8 mb-2 text-gray-600" />
                        <span className="text-sm font-medium">Payments</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <BarChart3 className="w-8 h-8 mb-2 text-gray-600" />
                        <span className="text-sm font-medium">View Reports</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent