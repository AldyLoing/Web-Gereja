import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Total Jemaat', value: '1,234', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { name: 'Keluarga', value: '456', icon: '🏠', color: 'from-green-500 to-green-600' },
    { name: 'Kelompok Sel', value: '12', icon: '⛪', color: 'from-purple-500 to-purple-600' },
    { name: 'Warta', value: '89', icon: '📰', color: 'from-orange-500 to-orange-600' },
  ]

  const quickLinks = [
    { name: 'Data Jemaat', href: '/admin/members', icon: '👥' },
    { name: 'Keluarga', href: '/admin/families', icon: '🏠' },
    { name: 'Kelompok Sel', href: '/admin/church-groups', icon: '⛪' },
    { name: 'Baptisan', href: '/admin/baptisms', icon: '💧' },
    { name: 'Warta', href: '/admin/posts', icon: '📰' },
    { name: 'Pengaturan', href: '/admin/settings', icon: '⚙️' },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Selamat datang di sistem manajemen gereja
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.name}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Menu Utama
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                >
                  <span className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Fitur dalam pengembangan
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                  <p>
                    Dashboard ini adalah versi demo. Fitur-fitur lengkap seperti CRUD data jemaat, 
                    manajemen keluarga, kelompok sel, dan warta sedang dalam pengembangan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
