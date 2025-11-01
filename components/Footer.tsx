import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Warta Jemaat
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sistem Informasi Manajemen Gereja untuk melayani jemaat dengan lebih baik dan terorganisir.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Menu
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-church-green dark:hover:text-church-green transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-600 dark:text-gray-400 hover:text-church-green dark:hover:text-church-green transition-colors">
                  Warta
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-church-green dark:hover:text-church-green transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Kontak
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Email: info@webgereja.id</li>
              <li>Telp: (021) 1234-5678</li>
              <li>Alamat: Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Warta Jemaat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
