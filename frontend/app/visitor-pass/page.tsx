'use client'
import { useState, useRef } from 'react'
import Nav from '@/components/home/Nav'
import Footer from '@/components/home/Footer'
import { submitForm } from '@/services/httpMethods'

const VisitorPass = () => {
    const [formData, setFormData] = useState<VisitorData>({
        name: '',
        phone: '',
        purpose: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [passData, setPassData] = useState<VisitorPassResponse['data'] | null>(null)
    const [error, setError] = useState('')
    const ticketRef = useRef<HTMLDivElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            // const response = await submitForm(formData, '/api/visitor-pass/')
            // Mock response for demonstration
            const response = await new Promise<VisitorPassResponse>((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true, 
                        message: 'Visitor pass generated successfully',
                        data: {
                            id: 1,
                            pass_number: 'VP' + Math.floor(1000 + Math.random() * 9000).toString(),
                            name: formData.name,
                            phone: formData.phone,
                            purpose: formData.purpose,
                            date_issued: new Date().toISOString().split('T')[0],
                            valid_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // valid for 24 hours

                        }
                    })
                }, 1500)    
            })

            if (response.success) {
                setPassData(response.data)
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    purpose: ''
                })
            } else {
                setError(response.message || 'Failed to generate visitor pass')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDownload = () => {
        if (ticketRef.current) {
            // Create a new window for printing
            const printWindow = window.open('', '', 'width=800,height=600')
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Visitor Pass - ${passData?.pass_number}</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 20px;
                                    background: white;
                                }
                                .ticket {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    border: 3px solid #2563eb;
                                    border-radius: 16px;
                                    padding: 30px;
                                    background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
                                }
                                .header {
                                    text-align: center;
                                    border-bottom: 2px solid #2563eb;
                                    padding-bottom: 20px;
                                    margin-bottom: 20px;
                                }
                                h1 {
                                    color: #1e40af;
                                    margin: 0 0 10px 0;
                                    font-size: 32px;
                                }
                                .pass-number {
                                    color: #2563eb;
                                    font-size: 24px;
                                    font-weight: bold;
                                    margin: 10px 0;
                                }
                                .info-row {
                                    display: flex;
                                    justify-content: space-between;
                                    padding: 15px;
                                    margin: 10px 0;
                                    background: white;
                                    border-radius: 8px;
                                    border-left: 4px solid #2563eb;
                                }
                                .label {
                                    font-weight: bold;
                                    color: #1e40af;
                                }
                                .value {
                                    color: #374151;
                                }
                                .footer {
                                    text-align: center;
                                    margin-top: 30px;
                                    padding-top: 20px;
                                    border-top: 2px solid #2563eb;
                                    color: #6b7280;
                                    font-size: 14px;
                                }
                                @media print {
                                    body {
                                        padding: 0;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            ${ticketRef.current.innerHTML}
                        </body>
                    </html>
                `)
                printWindow.document.close()
                printWindow.focus()
                setTimeout(() => {
                    printWindow.print()
                    printWindow.close()
                }, 250)
            }
        }
    }

    const handleNewPass = () => {
        setPassData(null)
        setError('')
    }

    return (
        <>
            <Nav />

            {/* Hero Section */}
            <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-indigo-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Visitor Pass
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Generate a digital visitor pass for Gokuldham Society
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    {!passData ? (
                        /* Visitor Form */
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-linear-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                Visitor Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter visitor's full name"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter 10-digit phone number"
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                    />
                                </div>

                                {/* Purpose Field */}
                                <div>
                                    <label htmlFor="purpose" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Purpose of Visit <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Describe the purpose of your visit..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none resize-none"
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-red-800 font-medium">{error}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating Pass...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                            Generate Visitor Pass
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Info Box */}
                            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">
                                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Important Information
                                </h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Visitor pass is valid for 24 hours from the time of generation</li>
                                    <li>• Please carry a valid ID proof along with the pass</li>
                                    <li>• Security may verify the details at the gate</li>
                                    <li>• Download and save your pass for future reference</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        /* Visitor Pass Ticket */
                        <div className="space-y-6">
                            <div className="bg-linear-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-green-900 mb-2">Pass Generated Successfully!</h3>
                                <p className="text-green-700">Your visitor pass has been created. You can download it below.</p>
                            </div>

                            {/* Ticket Display */}
                            <div ref={ticketRef} className="bg-linear-to-br from-blue-50 to-indigo-50 border-3 border-blue-600 rounded-2xl p-8 shadow-2xl">
                                <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
                                    <h2 className="text-3xl font-bold text-blue-900 mb-2">🏢 Gokuldham Society</h2>
                                    <h3 className="text-2xl font-bold text-blue-700 mb-4">Visitor Pass</h3>
                                    <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-lg font-bold">
                                        {passData.pass_number}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border-l-4 border-blue-600">
                                        <span className="font-bold text-blue-900">Visitor Name:</span>
                                        <span className="text-gray-900 font-semibold">{passData.name}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border-l-4 border-blue-600">
                                        <span className="font-bold text-blue-900">Phone Number:</span>
                                        <span className="text-gray-900 font-semibold">{passData.phone}</span>
                                    </div>

                                    <div className="flex flex-col p-4 bg-white rounded-xl border-l-4 border-blue-600">
                                        <span className="font-bold text-blue-900 mb-2">Purpose of Visit:</span>
                                        <span className="text-gray-900">{passData.purpose}</span>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border-l-4 border-green-600">
                                        <span className="font-bold text-green-900">Issued On:</span>
                                        <span className="text-gray-900 font-semibold">
                                            {new Date(passData.date_issued).toLocaleString('en-IN', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border-l-4 border-orange-600">
                                        <span className="font-bold text-orange-900">Valid Until:</span>
                                        <span className="text-gray-900 font-semibold">
                                            {new Date(passData.valid_until).toLocaleString('en-IN', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t-2 border-blue-600 text-center text-sm text-gray-600">
                                    <p>Please present this pass at the security gate along with a valid ID proof.</p>
                                    <p className="mt-2 font-semibold text-blue-900">Thank you for visiting Gokuldham Society!</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 flex-wrap">
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download / Print Pass
                                </button>

                                <button
                                    onClick={handleNewPass}
                                    className="flex-1 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Generate New Pass
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}

export default VisitorPass
