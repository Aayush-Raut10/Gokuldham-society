'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { Delete, Edit, Eye, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'

interface Resident {
    id: number
    name: string
    apartmentNo: string
    contact: string
    email: string
    status: 'Active' | 'Inactive' | 'Pending'
    joinedDate: string
}

const Residents = () => {
    const [searchQuery, setSearchQuery] = useState('')

    // Mock residents data (simulating database fetch)
    const allResidents: Resident[] = [
        {
            id: 1,
            name: 'John Doe',
            apartmentNo: 'A-101',
            contact: '+91 98765 43210',
            email: 'john.doe@example.com',
            status: 'Active',
            joinedDate: '2023-01-15'
        },
        {
            id: 2,
            name: 'Jane Smith',
            apartmentNo: 'B-205',
            contact: '+91 98765 43211',
            email: 'jane.smith@example.com',
            status: 'Active',
            joinedDate: '2023-02-20'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            apartmentNo: 'C-301',
            contact: '+91 98765 43212',
            email: 'mike.johnson@example.com',
            status: 'Inactive',
            joinedDate: '2022-11-10'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            apartmentNo: 'A-205',
            contact: '+91 98765 43213',
            email: 'sarah.wilson@example.com',
            status: 'Active',
            joinedDate: '2023-03-05'
        },
        {
            id: 5,
            name: 'Robert Brown',
            apartmentNo: 'D-102',
            contact: '+91 98765 43214',
            email: 'robert.brown@example.com',
            status: 'Pending',
            joinedDate: '2023-12-15'
        },
        {
            id: 6,
            name: 'Emily Davis',
            apartmentNo: 'B-103',
            contact: '+91 98765 43215',
            email: 'emily.davis@example.com',
            status: 'Active',
            joinedDate: '2023-01-30'
        },
        {
            id: 7,
            name: 'David Miller',
            apartmentNo: 'C-204',
            contact: '+91 98765 43216',
            email: 'david.miller@example.com',
            status: 'Active',
            joinedDate: '2023-06-12'
        },
        {
            id: 8,
            name: 'Lisa Anderson',
            apartmentNo: 'A-304',
            contact: '+91 98765 43217',
            email: 'lisa.anderson@example.com',
            status: 'Inactive',
            joinedDate: '2022-08-25'
        }
    ]

    // Filter residents based on search query
    const filteredResidents = useMemo(() => {
        if (!searchQuery.trim()) {
            return allResidents
        }

        const query = searchQuery.toLowerCase().trim()
        return allResidents.filter(resident =>
            resident.name.toLowerCase().includes(query) ||
            resident.apartmentNo.toLowerCase().includes(query) ||
            resident.contact.includes(query) ||
            resident.email.toLowerCase().includes(query)
        )
    }, [searchQuery, allResidents])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'text-green-600 bg-green-100'
            case 'Inactive':
                return 'text-red-600 bg-red-100'
            case 'Pending':
                return 'text-yellow-600 bg-yellow-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-5 mb-5">
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>Residents</h1>
                    <p className='text-gray-600 mt-1'>Manage apartment residents and their information</p>
                </div>
                <Link href="/admin/residents/add" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <span>Add Resident</span>
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
                        placeholder="Search by name, apartment number, contact, or email..."
                    />
                </div>
                {searchQuery && (
                    <div className="mt-2 text-sm text-gray-600">
                        Found {filteredResidents.length} resident{filteredResidents.length !== 1 ? 's' : ''}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </div>
                )}
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {filteredResidents.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">No residents found</div>
                        <div className="text-gray-500 text-sm">
                            {searchQuery ? 'Try adjusting your search terms' : 'No residents registered yet'}
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Apartment</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredResidents.map((resident) => (
                                    <tr key={resident.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">{resident.name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{resident.apartmentNo}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{resident.contact}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{resident.email}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(resident.status)}`}>
                                                {resident.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/admin/residents/${resident.id}/view`}
                                                    className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/residents/${resident.id}/edit`}
                                                    className="text-primary hover:text-primary-700 p-1 rounded transition-colors"
                                                    title="Edit Resident"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                                                    title="Delete Resident"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this resident?')) {
                                                            console.log('Delete resident:', resident.id)
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
            {filteredResidents.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredResidents.length} of {allResidents.length} residents
                </div>
            )}
        </AdminLayout>
    )
}

export default Residents
