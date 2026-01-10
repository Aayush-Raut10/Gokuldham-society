'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import { fetchData } from '@/services/httpMethods'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

const Complaints = () => {

    const [complaints, setComplaints] = useState<any[]>([])

    useEffect(() => {
        const getComplaints = async () => {
            const res = await fetchData('/api/complains')
            if (res.success && res.data) {
                setComplaints(res.data)
                console.log('Complaints data:', res.data)
            }
        }
        getComplaints()
    }, [])

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-5 mb-5">
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>Complaints</h1>
                    <p className='text-gray-600 mt-1'>View and manage resident complaints</p>
                </div>
            </div>

            {
                complaints.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <p className="text-gray-600">No complaints found.</p>
                    </div>
                )
                    :
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-200">
                                    <th className="py-2 px-4 text-gray-900 font-medium">Resident Name</th>
                                    <th className="py-2 px-4 text-gray-900 font-medium">Category</th>
                                    <th className="py-2 px-4 text-gray-900 font-medium">Complaint</th>
                                    <th className="py-2 px-4 text-gray-900 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map((complaint) => (
                                    <tr key={complaint.id} className="border-b border-gray-100">
                                        <td className="py-2 px-4">{complaint.member_id}</td>
                                        <td className="py-2 px-4">{complaint.category}</td>
                                        <td className="py-2 px-4">{complaint.description}</td>
                                        <td className="py-2 px-4">
                                            <button className="text-green-600 hover:text-green-800 flex items-center">
                                                <Check size={16} className='inline-block mr-1' /> Mark as Resolved
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

export default Complaints
