'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { useForm, FormMessage, PageHeader, FormField, SelectField } from '@/components/common'
import { fetchData, submitForm } from '@/services/httpMethods';
import { useEffect, useState } from 'react';

const AddResidents = () => {
    const initialValues: ResidentFormData = {
        fullName: '',
        flatNumber: '',
        contactNumber: '',
        email: '',
        isActive: 'yes',
        age: ''
    };

    const [flats, setFlats] = useState<Array<{ value: string; label: string }>>([]);

    useEffect(() => {
        const resPromise = fetchData('/api/flats');
        resPromise.then(response => {
            if (response.success && response.data) {
                const flatOptions = response.data.map((flat: { flat_id: string }) => ({
                    value: flat.flat_id,
                    label: flat.flat_id
                }));
                setFlats(flatOptions);
            }
        });
    }, []);

    const {
        values,
        handleChange,
        handleSubmit,
        isLoading,
        message,
        clearMessage
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

            const res = await submitForm(data, '/api/members');

            if (!res.success) {
                throw new Error(res.message || 'Failed to add resident');
            }

            setTimeout(() => {
                window.location.href = '/admin/residents';
            }, 2000);
        },
        resetOnSubmit: false,
        successMessage: 'Resident added successfully! Redirecting to residents list...'
    });

    const activeOptions = [
        { value: 'yes', label: 'Active' },
        { value: 'no', label: 'Inactive' }
    ];

    return (
        <AdminLayout>
            <PageHeader
                title="Add New Resident"
                description="Register a new resident in the society"
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
                        type="select"
                        name="flatNumber"
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
                        {isLoading ? 'Adding Resident...' : 'Add Resident'}
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

export default AddResidents