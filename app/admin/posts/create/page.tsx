'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X, FileText } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Category {
  id: string;
  name: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    cover: '',
    isActive: true,
    publishedAt: new Date().toISOString().split('T')[0],
    categoryIds: [] as string[]
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?limit=100');
      const result = await response.json();
      setCategories(result.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, cover: data.url });
      } else {
        alert('Gagal mengupload gambar');
        setCoverPreview('');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Terjadi kesalahan saat mengupload gambar');
      setCoverPreview('');
    }
  };

  const removeCover = () => {
    setFormData({ ...formData, cover: '' });
    setCoverPreview('');
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null
        })
      });

      if (response.ok) {
        alert('Warta berhasil ditambahkan!');
        router.push('/admin/posts');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Gagal menambahkan warta'}`);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-church-green transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-church-green rounded-xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tambah Warta Gereja
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Isi formulir untuk menambahkan warta baru
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Judul Warta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="Judul warta"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
                placeholder="slug-warta"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                URL-friendly version (otomatis dibuat dari judul)
              </p>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gambar Cover
              </label>
              
              {coverPreview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG atau JPEG (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverUpload}
                  />
                </label>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Konten <span className="text-red-500">*</span>
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                className="bg-white dark:bg-gray-700 rounded-lg"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategori
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categoryIds.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 text-church-green border-gray-300 rounded focus:ring-church-green"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tanggal Publikasi
              </label>
              <input
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-church-green focus:border-transparent"
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-church-green border-gray-300 rounded focus:ring-church-green"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Aktifkan warta (tampilkan di website)
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-church-green hover:bg-church-green-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
              <Link
                href="/admin/posts"
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
