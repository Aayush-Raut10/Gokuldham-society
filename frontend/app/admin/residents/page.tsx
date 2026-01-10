'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { Delete, Edit, Eye, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:8000'

interface Resident {
    id: number
    full_name: string
    flat_id_id: string
    phone: string
    email: string
    age: number
    is_active: boolean
    joined_date: string
}

const Residents = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [residents, setResidents] = useState<Resident[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasSearched, setHasSearched] = useState(false)

    // Load all members initially
    useEffect(() => {
        const fetchAllMembers = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${BACKEND_API}/api/members`)
                const data = await response.json()
                setResidents(data)
            } catch (error) {
                console.error('Error fetching residents:', error)
                setResidents([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchAllMembers()
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            setSearchQuery('')
            setHasSearched(false)
            setIsLoading(true)
            try {
                const response = await fetch(`${BACKEND_API}/api/members`)
                const data = await response.json()
                setResidents(data)
            } catch (error) {
                console.error('Error fetching residents:', error)
                setResidents([])
            } finally {
                setIsLoading(false)
            }
            return
        }

        setSearchQuery(searchInput)
        setIsLoading(true)
        setHasSearched(true)

        try {
            const url = `${BACKEND_API}/api/members?search=${encodeURIComponent(searchInput)}`
            const response = await fetch(url)
            const data = await response.json()
            setResidents(data)
        } catch (error) {
            console.error('Error fetching residents:', error)
            setResidents([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const deleteResident = async (residentId: number) => {
        try {
            const response = await fetch(`${BACKEND_API}/api/members/${residentId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setResidents(prev => prev?.filter(resident => resident.id !== residentId))
            } else {
                console.error('Failed to delete resident')
            }
        } catch (error) {
            console.error('Error deleting resident:', error)
        }
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

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="text-center py-20">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Searching...</p>
                </div>
            </AdminLayout>
        )
    }
    else {

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
                            value={searchInput}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Search by name... (Press Enter to search)"
                        />
                    </div>
                    {searchQuery && hasSearched && (
                        <div className="mt-2 text-sm text-gray-600">
                            Found {residents.length} resident{residents.length !== 1 ? 's' : ''}
                            {searchQuery && ` matching "${searchQuery}"`}
                        </div>
                    )}
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {residents.length === 0 && hasSearched ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg mb-2">No residents found</div>
                            <div className="text-gray-500 text-sm">
                                Try adjusting your search terms
                            </div>
                        </div>
                    ) : residents.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg mb-2">No residents registered yet</div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Flat</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Age</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Joined Date</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {residents.map((resident) => (
                                        <tr key={resident.id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">{resident.full_name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{resident.flat_id_id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{resident.phone}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{resident.age}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{resident.email}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{resident.joined_date}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(resident.is_active ? 'Active' : 'Inactive')}`}>
                                                    {resident.is_active ? 'Active' : 'Inactive'}
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
                                                                deleteResident(resident.id)
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
                {residents?.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {residents?.length} resident{residents.length !== 1 ? 's' : ''}
                        {hasSearched && searchQuery && ` matching "${searchQuery}"`}
                    </div>
                )}
            </AdminLayout>
        )
    }
}

export default Residents
