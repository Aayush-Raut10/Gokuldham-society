'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { useForm, FormMessage, PageHeader, FormField, SelectField } from '@/components/common'
import { updateForm, fetchData } from '@/services/httpMethods'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditResident = () => {
    const params = useParams()
    const router = useRouter()
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [dataError, setDataError] = useState<string | null>(null)
    const [flats, setFlats] = useState<Array<{ value: string; label: string }>>([])

    const initialValues: ResidentFormData = {
        fullName: '',
        flatNumber: '',
        contactNumber: '',
        email: '',
        isActive: 'yes',
        age: ''
    }

    const {
        values,
        handleChange,
        handleSubmit,
        isLoading,
        message,
        clearMessage,
        setValues
    } = useForm({
        initialValues,
        onSubmit: async (formData) => {
            const data = {
                "fullname": formData.fullName,
                "flatid": formData.flatNumber,
                "phone": formData.contactNumber,
                "email": formData.email,
                "age": parseInt(formData.age, 10)
            }

            const res = await updateForm(data, `/api/members/${params.id}`)

            if (!res.success) {
                throw new Error(res.message || 'Failed to update resident')
            }

            setTimeout(() => {
                router.push('/admin/residents')
            }, 2000)
        },
        resetOnSubmit: false,
        successMessage: 'Resident updated successfully! Redirecting to residents list...'
    })

    useEffect(() => {

        const resPromise = fetchData('/api/flats')
        resPromise.then(response => {
            if (response.success && response.data) {
                const flatOptions = response.data.map((flat: { flat_id: string }) => ({
                    value: flat.flat_id,
                    label: flat.flat_id
                }))
                setFlats(flatOptions)
            }
        })

        const loadResidentData = async () => {
            setIsLoadingData(true)
            setDataError(null)

            try {
                const response = await fetchData(`/api/members/${params.id}`)

                if (response.success && response.data) {
                    const resident: FetchedResidentData = response.data


                    setValues({
                        fullName: resident.fullname,
                        flatNumber: resident.flatid,
                        contactNumber: resident.phone,
                        email: resident.email,
                        isActive: resident.is_active ? 'yes' : 'no',
                        age: resident.age.toString()
                    })
                } else {
                    setDataError(response.message || 'Failed to load resident data')
                }
            } catch (error) {
                setDataError('Error loading resident data')
            } finally {
                setIsLoadingData(false)
            }
        }

        if (params.id) {
            loadResidentData()
        }
    }, [params.id, setValues])

    const activeOptions = [
        { value: 'yes', label: 'Active' },
        { value: 'no', label: 'Inactive' }
    ]

    if (isLoadingData) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading resident data...</div>
                </div>
            </AdminLayout>
        )
    }

    if (dataError) {
        return (
            <AdminLayout>
                <PageHeader
                    title="Edit Resident"
                    description="Unable to load resident data"
                    backUrl="/admin/residents"
                    backText="Back to Residents"
                />
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="text-red-800">
                        <strong>Error:</strong> {dataError}
                    </div>
                    <Link
                        href="/admin/residents"
                        className="inline-block mt-2 text-red-600 hover:text-red-800 underline"
                    >
                        Return to Residents List
                    </Link>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <PageHeader
                title="Edit Resident"
                description="Update resident information in the society"
                backUrl="/admin/residents"
                backText="Back to Residents"
            />

            {message && (
                <FormMessage
                    type={message.type}
                    message={message.text}
                    onDismiss={clearMessage}
                />
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />

                    <FormField
                        label="Flat Number"
                        name="flatNumber"
                        type="select"
                        options={[
                            ...flats
                        ]}
                        value={values.flatNumber}
                        onChange={handleChange}
                        placeholder="Select flat number"
                        required
                    />

                    <FormField
                        label="Contact Number"
                        name="contactNumber"
                        type="tel"
                        value={values.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        required
                    />

                    <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                    />

                    <SelectField
                        label="Status"
                        name="isActive"
                        value={values.isActive}
                        onChange={handleChange}
                        options={activeOptions}
                        required
                        className="md:col-span-1"
                    />

                    <FormField
                        label="Age"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        required
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Updating Resident...' : 'Update Resident'}
                    </button>
                    <Link
                        href="/admin/residents"
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    )
}

export default EditResident