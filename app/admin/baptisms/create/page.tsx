'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Droplets } from 'lucide-react';
import Link from 'next/link';

interface Member {
  id: string;
  fullName: string;
}

export default function CreateBaptismPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [formData, setFormData] = useState({
    memberId: '',
    baptismDate: '',
    baptismPlace: '',
    minister: '',
    certificate: ''
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members?limit=1000');
      const result = await response.json();
      setMembers(result.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/baptisms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          baptismDate: new Date(formData.baptismDate).toISOString()
        })
      });

      if (response.ok) {
        alert('Data baptisan berhasil ditambahkan!');
        router.push('/admin/baptisms');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Gagal menambahkan data'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin/baptisms"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-church-green transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-church-green rounded-xl">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tambah Data Baptisan
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Isi formulir untuk menambahkan data baptisan baru
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jemaat <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
              >
                <option value="">Pilih Jemaat</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tanggal Baptisan <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.baptismDate}
                onChange={(e) => setFormData({ ...formData, baptismDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tempat Baptisan
              </label>
              <input
                type="text"
                value={formData.baptismPlace}
                onChange={(e) => setFormData({ ...formData, baptismPlace: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="Nama gereja atau tempat baptisan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pendeta/Pengurus <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.minister}
                onChange={(e) => setFormData({ ...formData, minister: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="Nama pendeta/pengurus yang membaptis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nomor Sertifikat
              </label>
              <input
                type="text"
                value={formData.certificate}
                onChange={(e) => setFormData({ ...formData, certificate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="Nomor sertifikat baptisan"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-church-green hover:bg-church-green-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
              <Link
                href="/admin/baptisms"
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
