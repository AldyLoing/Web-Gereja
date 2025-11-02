'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [families, setFamilies] = useState<any[]>([]);
  const [churchGroups, setChurchGroups] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nik: '',
    kk: '',
    fullName: '',
    gender: 'MALE',
    birthPlace: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    maritalStatus: 'SINGLE',
    familyId: '',
    churchGroupIds: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    params.then(resolvedParams => {
      setId(resolvedParams.id);
      fetchData(resolvedParams.id);
      fetchFamilies();
      fetchChurchGroups();
    });
  }, [params]);

  const fetchData = async (memberId: string) => {
    try {
      const response = await fetch(`/api/members/${memberId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          nik: data.nik || '',
          kk: data.kk || '',
          fullName: data.fullName || '',
          gender: data.gender || 'MALE',
          birthPlace: data.birthPlace || '',
          birthDate: data.birthDate ? data.birthDate.split('T')[0] : '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          maritalStatus: data.maritalStatus || 'SINGLE',
          familyId: data.familyId || '',
          churchGroupIds: data.churchGroups?.map((cg: any) => cg.churchGroupId) || []
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchFamilies = async () => {
    try {
      const response = await fetch('/api/families?limit=1000');
      const result = await response.json();
      setFamilies(result.data || []);
    } catch (error) {
      console.error('Error fetching families:', error);
    }
  };

  const fetchChurchGroups = async () => {
    try {
      const response = await fetch('/api/church-groups?limit=1000');
      const result = await response.json();
      setChurchGroups(result.data || []);
    } catch (error) {
      console.error('Error fetching church groups:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Data berhasil diupdate!');
        router.push('/admin/members');
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

  const handleChurchGroupChange = (groupId: string) => {
    setFormData(prev => ({
      ...prev,
      churchGroupIds: prev.churchGroupIds.includes(groupId)
        ? prev.churchGroupIds.filter(id => id !== groupId)
        : [...prev.churchGroupIds, groupId]
    }));
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin/members"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-church-green transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Data Jemaat
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Pribadi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nomor KK
                </label>
                <input
                  type="text"
                  value={formData.kk}
                  onChange={(e) => setFormData({ ...formData, kk: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="MALE">Laki-laki</option>
                  <option value="FEMALE">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status Perkawinan
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="SINGLE">Belum Menikah</option>
                  <option value="MARRIED">Menikah</option>
                  <option value="DIVORCED">Cerai</option>
                  <option value="WIDOWED">Duda/Janda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Kontak</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alamat
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Informasi Gereja</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keluarga
              </label>
              <select
                value={formData.familyId}
                onChange={(e) => setFormData({ ...formData, familyId: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">-- Pilih Keluarga (Opsional) --</option>
                {families.map(family => (
                  <option key={family.id} value={family.id}>{family.familyHead}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Kelompok Sel (Pilih satu atau lebih)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {churchGroups.map(group => (
                  <label
                    key={group.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.churchGroupIds.includes(group.id)}
                      onChange={() => handleChurchGroupChange(group.id)}
                      className="w-5 h-5 rounded border-gray-300 text-church-green focus:ring-church-green"
                    />
                    <span className="text-gray-900 dark:text-white">{group.name}</span>
                  </label>
                ))}
              </div>
            </div>
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
              href="/admin/members"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
