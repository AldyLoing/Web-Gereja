export default function AdminBaptismsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Baptisan</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Kelola data baptisan jemaat</p>
          </div>
          <button className="px-4 py-2 bg-church-green text-white rounded-lg hover:bg-church-green-dark transition-colors">
            + Tambah Data Baptisan
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">💧</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Manajemen Data Baptisan
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Halaman CRUD untuk data baptisan sedang dalam pengembangan.<br />
            <span className="text-sm italic">Coming soon...</span>
          </p>
        </div>
      </div>
    </main>
  )
}
