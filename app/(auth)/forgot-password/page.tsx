import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex min-h-[calc(100vh-180px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Lupa Password
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Fitur reset password belum tersedia
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Fitur reset password sedang dalam pengembangan.<br />
                  Silakan hubungi administrator.
                </p>
                <Link 
                  href="/login"
                  className="inline-block px-6 py-3 bg-church-green text-white rounded-lg hover:bg-church-green-dark transition-colors"
                >
                  Kembali ke Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
