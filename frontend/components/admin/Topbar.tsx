import React from 'react'
import { Menu, Bell, LogOut } from 'lucide-react'

interface TopbarProps {
    onMenuClick: () => void
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-gray-500 hover:text-gray-700 mr-3 p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-lg lg:text-xl font-semibold text-primary">Admin</h1>
            </div>

            <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5" />
                </button>

                <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <LogOut className="w-5 h-5" />
                </button>

                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ml-2">
                    <span className="text-white text-sm font-medium">A</span>
                </div>
            </div>
        </header>
    )
}

export default Topbar