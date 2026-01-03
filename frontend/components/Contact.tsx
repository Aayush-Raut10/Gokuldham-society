'use client';

import { useState } from "react";
import { submitForm } from "@/services/submitForm";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [error, setError] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const res = await submitForm(formData, '/api/contact');

        if (res.success) {
            alert(res.message);
            setFormData({ name: '', email: '', message: '' });
            setError(null);
        } else {
            setError(res.message);
        }
        setIsSubmitting(false);
    }

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h3>
                    <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-lg mb-1">Address</h5>
                                <p className="text-gray-600">Gokuldham Society, Powder Gali,<br />Mumbai, Maharashtra 400001</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-lg mb-1">Phone</h5>
                                <p className="text-gray-600">+91 98765 43210<br />+91 98765 43211</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-lg mb-1">Email</h5>
                                <p className="text-gray-600">info@gokuldham.com<br />support@gokuldham.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-xl">
                        <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                                    placeholder="Your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                                    placeholder="your@email.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                                    rows={4}
                                    placeholder="Your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="cursor-pointer w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                {
                                    isSubmitting ? 'Sending...' : 'Send Message'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Contact
