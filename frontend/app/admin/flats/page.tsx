'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { deleteData, fetchData } from '@/services/httpMethods'
import { Delete, Edit } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Flats = () => {

    const [flats, setFlats] = useState<{ flat_id: string }[]>([])

    useEffect(() => {
        const getFlats = async () => {
            const response = await fetchData('/api/flats')
            if (response.success && response.data) {
                setFlats(response.data)
                console.log('Flats data:', response.data)
            }
        }
        getFlats()
    }, [])


    const handleDelete = async (flatId: string) => {
        if (!confirm('Are you sure you want to delete this flat?')) {
            return
        }

        const message = await deleteData(`/api/flats/${flatId}`)
        if (message.success) {
            const updatedData = flats.filter(item => item.flat_id !== flatId)
            setFlats(updatedData)
        }
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-5 mb-5">
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>Flats</h1>
                    <p className='text-gray-600 mt-1'>Manage apartment flats information</p>
                </div>
                <Link href="/admin/flats/add" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <span>Add Flat</span>
                </Link>
            </div>

            {
                flats.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <p className="text-gray-600">No flats found. Click "Add Flat" to create a new flat.</p>
                    </div>
                )
                    :

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <table>
                            <thead>
                                <tr className="text-left border-b border-gray-200">
                                    <th className="py-2 px-4 text-gray-900 font-medium">Flat Number</th>
                                    <th className="py-2 px-4 text-gray-900 font-medium">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {flats.map((flat: { flat_id: string }) => (
                                    <tr key={flat.flat_id} className="border-b border-gray-100 last:border-b-0">
                                        <td className="py-3 px-4 text-gray-800">{flat.flat_id}</td>
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/admin/flats/${flat.flat_id}/edit`}
                                                aria-label='edit'
                                                className="text-primary hover:text-primary-700 font-medium"
                                            >
                                                <Edit className="w-4 h-4 inline-block mr-1" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(flat.flat_id)}
                                                aria-label='delete'
                                                className="ml-4 cursor-pointer text-red-600 hover:text-red-800 font-medium"
                                            >
                                                <Delete className="w-5 h-5 inline-block mr-1" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
            }

        </AdminLayout>
    )
}

export default Flats
