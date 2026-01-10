import AdminLayout from '@/components/admin/AdminLayout'
import { fetchData } from '@/services/httpMethods'
import { Check, X } from 'lucide-react'

const VisitorPass = async () => {

    const res = await fetchData('/api/visitors')
    let visitorPassData: any[] = []

    if (res.success && res.data) {
        visitorPassData = res.data
        console.log('Visitor Pass data:', res.data)
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between gap-5 mb-5">
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>Visitor Pass</h1>
                    <p className='text-gray-600 mt-1'>Manage visitor pass information</p>
                </div>
            </div>

            {
                visitorPassData?.length > 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {visitorPassData.map((pass) => (
                                    <tr key={pass.id} className='hover:bg-gray-50'>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pass.purpose}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pass.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                pass.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {pass.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <button className="font-bold cursor-pointer">
                                                <Check className="w-4 h-4 inline-block ml-3 text-green-800" />
                                            </button>
                                            <button className="font-bold cursor-pointer ml-4">
                                                <X className="w-4 h-4 inline-block ml-3 text-red-800" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Visitor Pass Records</h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-8">
                            There are currently no visitor pass records. Check back later for updates.
                        </p>
                    </div>
                )
            }

        </AdminLayout>

    )
}

export default VisitorPass
