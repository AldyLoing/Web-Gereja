'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  Home,
  Users2,
  Droplet,
  FileText,
  Tag,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const menuItems = [
  { 
    title: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard 
  },
  {
    title: 'Data Gereja',
    icon: Users2,
    children: [
      { title: 'Jemaat', href: '/admin/members', icon: Users },
      { title: 'Keluarga', href: '/admin/families', icon: Home },
      { title: 'Kelompok Gereja', href: '/admin/church-groups', icon: Users2 },
      { title: 'Data Baptisan', href: '/admin/baptisms', icon: Droplet },
      { title: 'Ulang Tahun', href: '/admin/birthdays', icon: Calendar }
    ]
  },
  {
    title: 'Warta Jemaat',
    icon: FileText,
    children: [
      { title: 'Kelola Warta', href: '/admin/posts', icon: FileText },
      { title: 'Kategori', href: '/admin/categories', icon: Tag }
    ]
  },
  {
    title: 'Pengaturan',
    href: '/admin/settings',
    icon: Settings
  }
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-church-green text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="p-2 bg-church-green rounded-lg">
                <Users2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Gereja Imanuel
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Admin Panel
                </p>
              </div>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedMenu === item.title ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedMenu === item.title && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                  pathname === child.href
                                    ? 'bg-church-green text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                <child.icon className="w-4 h-4" />
                                <span className="text-sm">{child.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        pathname === item.href
                          ? 'bg-church-green text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
