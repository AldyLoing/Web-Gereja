'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditFamilyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [formData, setFormData] = useState({
    familyHead: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    params.then(resolvedParams => {
      setId(resolvedParams.id);
      fetchData(resolvedParams.id);
    });
  }, [params]);

  const fetchData = async (familyId: string) => {
    try {
      const response = await fetch(`/api/families/${familyId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          familyHead: data.familyHead || '',
          address: data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Gagal memuat data');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/families/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Data berhasil diupdate!');
        router.push('/admin/families');
      } else {
        const error = await response.json();
        alert(error.error || 'Gagal mengupdate data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengupdate data');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin/families"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-church-green transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Data Keluarga
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kepala Keluarga <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.familyHead}
                onChange={(e) => setFormData({ ...formData, familyHead: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="Nama kepala keluarga"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alamat
              </label>
              <textarea
                rows={4}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="Alamat lengkap keluarga..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-church-green hover:bg-church-green-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <Link
                href="/admin/families"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
