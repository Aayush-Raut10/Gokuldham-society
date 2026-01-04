'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface NavigationItemProps {
    icon: LucideIcon
    label: string
    href: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({ icon: Icon, label, href }) => {
    const pathname = usePathname()
    // Check if current path starts with the href (for nested routes like /admin/notices/add)
    const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))

    return (
        <li>
            <Link
                href={href}
                className={`flex items-center px-3 py-2.5 rounded-md transition-colors duration-200 group ${isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                <Icon
                    className={`w-5 h-5 mr-3 ${isActive
                        ? 'text-primary-600'
                        : 'text-gray-500 group-hover:text-gray-700'
                        }`}
                />
                <span className="font-medium">{label}</span>
            </Link>
        </li>
    )
}

interface NavigationMenuProps {
    menuItems: Array<{
        icon: LucideIcon
        label: string
        href: string
    }>
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ menuItems }) => {
    return (
        <nav className="mt-6">
            <ul className="space-y-1 px-3">
                {menuItems.map((item, index) => (
                    <NavigationItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                    />
                ))}
            </ul>
        </nav>
    )
}