import React from 'react'
import { Home, Megaphone, Users, Building, DollarSign, ClipboardList, X, PersonStanding } from 'lucide-react'
import { NavigationMenu } from './NavigationMenu'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/admin' },
        { icon: Megaphone, label: 'Notices', href: '/admin/notices' },
        { icon: Users, label: 'Residents', href: '/admin/residents' },
        { icon: Building, label: 'Flats', href: '/admin/flats' },
        { icon: DollarSign, label: 'Payments', href: '/admin/payments' },
        { icon: ClipboardList, label: 'Complaints', href: '/admin/complaints' },
        { icon: PersonStanding, label: 'Visitor Pass', href: '/admin/visitor-pass' },
    ]

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-primary">Gokuldham</h1>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <NavigationMenu menuItems={menuItems} />

                <div className="absolute bottom-4 left-3 right-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                                A
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-700 truncate">Admin User</p>
                                <p className="text-xs text-gray-500 truncate">admin@gokuldham.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar