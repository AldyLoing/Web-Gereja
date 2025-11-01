export default function AdminFamiliesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Keluarga</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Kelola data keluarga jemaat</p>
          </div>
          <button className="px-4 py-2 bg-church-green text-white rounded-lg hover:bg-church-green-dark transition-colors">
            + Tambah Keluarga
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Manajemen Data Keluarga
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Halaman CRUD untuk data keluarga sedang dalam pengembangan.<br />
            <span className="text-sm italic">Coming soon...</span>
          </p>
        </div>
      </div>
    </main>
  )
}
