export default function AdminMembersPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Jemaat</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Kelola data anggota jemaat</p>
          </div>
          <button className="px-4 py-2 bg-church-green text-white rounded-lg hover:bg-church-green-dark transition-colors">
            + Tambah Jemaat
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Manajemen Data Jemaat
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Halaman CRUD untuk data jemaat sedang dalam pengembangan.<br />
            <span className="text-sm italic">Coming soon...</span>
          </p>
        </div>
      </div>
    </main>
  )
}
