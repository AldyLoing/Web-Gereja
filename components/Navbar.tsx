'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Check if we're in admin area
  const isAdminArea = pathname?.startsWith('/admin')

  useEffect(() => {
    setMounted(true)
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedMode)
    if (savedMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Prevent hydration mismatch by not rendering dark mode toggle until mounted
  if (!mounted) {
    return (
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-church-green to-church-green-dark rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5L2 9.5v7.5h5v-5h6v5h5V9.5L10 3.5z"/>
                  <path d="M10 0l2 2h-4l2-2z"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-church-green to-church-green-dark bg-clip-text text-transparent">
                  Warta Jemaat
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Gereja Kristen</p>
              </div>
            </Link>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                Beranda
              </Link>
              <Link href="/posts" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                Warta
              </Link>
              <Link href="/login" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                Login
              </Link>
            </div>

            {/* Placeholder for dark mode toggle */}
            <div className="w-10 h-10" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-church-green to-church-green-dark rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5L2 9.5v7.5h5v-5h6v5h5V9.5L10 3.5z"/>
                <path d="M10 0l2 2h-4l2-2z"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-church-green to-church-green-dark bg-clip-text text-transparent">
                Warta Jemaat
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gereja Kristen</p>
            </div>
          </Link>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
              Beranda
            </Link>
            <Link href="/posts" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
              Warta
            </Link>
            {isAdminArea ? (
              <>
                <Link href="/admin/dashboard" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                Login
              </Link>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {!darkMode ? (
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {!mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
              Beranda
            </Link>
            <Link href="/posts" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
              Warta
            </Link>
            {isAdminArea ? (
              <>
                <Link href="/admin/dashboard" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
