'use client'

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleSidebarClose = () => {
        setSidebarOpen(false)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

            <div className="lg:ml-64">
                <Topbar onMenuClick={handleMenuClick} />

                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout