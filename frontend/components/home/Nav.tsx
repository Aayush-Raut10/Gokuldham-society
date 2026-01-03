'use client';
import Link from "next/link";
import { useState } from "react";

const Nav = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Features', href: '/#features' },
        { name: 'Services', href: '/#services' },
        { name: 'Amenities', href: '/#amenities' },
        { name: 'Contact', href: '/#contact' },
    ]

    return (
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50" >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
                            <Link href="/">Gokuldham Society</Link>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-8">
                        {menuItems.map((item) => (
                            <Link key={item.name} href={item.href} className="text-gray-700 hover:text-blue-600 transition">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex space-x-4">
                        <Link href="/resident-login" className="px-4 py-2 text-blue-600 hover:text-blue-700 transition">Resident Login</Link>
                        <Link href="/visitor-pass" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Visitor Pass</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-4">

                            {
                                menuItems.map((item) => (
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 hover:text-blue-600 transition px-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            }

                            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 transition text-left">
                                    Resident Login
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    Visitor Pass
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav >
    )
}

export default Nav
