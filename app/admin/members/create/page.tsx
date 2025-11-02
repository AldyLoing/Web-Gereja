'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Users } from 'lucide-react';
import Link from 'next/link';

interface Family {
  id: string;
  familyHead: string;
}

interface ChurchGroup {
  id: string;
  name: string;
}

export default function CreateMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [families, setFamilies] = useState<Family[]>([]);
  const [churchGroups, setChurchGroups] = useState<ChurchGroup[]>([]);

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

  useEffect(() => {
    fetchFamilies();
    fetchChurchGroups();
  }, []);

  const fetchFamilies = async () => {
    try {
      const response = await fetch('/api/families?limit=100');
      const result = await response.json();
      setFamilies(result.data || []);
    } catch (error) {
      console.error('Error fetching families:', error);
    }
  };

  const fetchChurchGroups = async () => {
    try {
      const response = await fetch('/api/church-groups?limit=100');
      const result = await response.json();
      setChurchGroups(result.data || []);
    } catch (error) {
      console.error('Error fetching church groups:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChurchGroupChange = (groupId: string) => {
    setFormData(prev => ({
      ...prev,
      churchGroupIds: prev.churchGroupIds.includes(groupId)
        ? prev.churchGroupIds.filter(id => id !== groupId)
        : [...prev.churchGroupIds, groupId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
        familyId: formData.familyId || null
      };

      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        alert('Data jemaat berhasil ditambahkan!');
        router.push('/admin/members');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Gagal menambahkan data'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/members"
            className="inline-flex items-center gap-2 text-church-green hover:text-church-green-dark mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Daftar Jemaat</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-church-green rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tambah Data Jemaat
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Isi formulir untuk menambahkan jemaat baru
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Informasi Pribadi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  maxLength={16}
                  placeholder="3201234567890123"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nomor KK
                </label>
                <input
                  type="text"
                  name="kk"
                  value={formData.kk}
                  onChange={handleChange}
                  maxLength={16}
                  placeholder="3201234567890123"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                >
                  <option value="MALE">Laki-laki</option>
                  <option value="FEMALE">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Status Pernikahan
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                >
                  <option value="SINGLE">Belum Menikah</option>
                  <option value="MARRIED">Menikah</option>
                  <option value="DIVORCED">Cerai</option>
                  <option value="WIDOWED">Janda/Duda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="Jakarta"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Informasi Kontak
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08123456789"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Jl. Contoh No. 123, Jakarta"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Church Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Informasi Gereja
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Keluarga
                </label>
                <select
                  name="familyId"
                  value={formData.familyId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                >
                  <option value="">-- Pilih Keluarga (Opsional) --</option>
                  {families.map(family => (
                    <option key={family.id} value={family.id}>
                      {family.familyHead}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Kelompok Sel (Pilih satu atau lebih)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {churchGroups.map(group => (
                    <label
                      key={group.id}
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.churchGroupIds.includes(group.id)}
                        onChange={() => handleChurchGroupChange(group.id)}
                        className="w-5 h-5 text-church-green focus:ring-church-green border-gray-300 rounded"
                      />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {group.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin/members"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-church-green hover:bg-church-green-dark text-white rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Simpan Data</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
