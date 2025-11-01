'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  Home, 
  Users2, 
  Droplet, 
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartGroup from '@/components/dashboard/ChartGroup';
import { getDashboardStats } from '@/app/actions/dashboard';

interface DashboardStats {
  totalMembers: number;
  totalFamilies: number;
  totalBaptisms: number;
  totalPosts: number;
  birthdaysThisMonth: number;
  baptismsThisMonth: number;
  groupDistribution: { name: string; count: number }[];
  recentActivity: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-church-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Selamat datang di sistem manajemen Gereja Imanuel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Jemaat"
            value={stats?.totalMembers || 0}
            icon={Users}
            color="green"
            trend="+12%"
          />
          <StatCard
            title="Total Keluarga"
            value={stats?.totalFamilies || 0}
            icon={Home}
            color="blue"
            trend="+5%"
          />
          <StatCard
            title="Baptisan Bulan Ini"
            value={stats?.baptismsThisMonth || 0}
            icon={Droplet}
            color="cyan"
            trend="+8"
          />
          <StatCard
            title="Ulang Tahun Bulan Ini"
            value={stats?.birthdaysThisMonth || 0}
            icon={Calendar}
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Group Distribution Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-church-green/10 rounded-lg">
                <Users2 className="w-6 h-6 text-church-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Distribusi Kelompok
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Jumlah anggota per kelompok gereja
                </p>
              </div>
            </div>
            <ChartGroup data={stats?.groupDistribution || []} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Aktivitas Terbaru
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Log perubahan data terkini
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {stats?.recentActivity?.slice(0, 5).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="p-2 bg-church-green/10 rounded">
                    <FileText className="w-4 h-4 text-church-green" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-center text-gray-500 py-8">
                  Belum ada aktivitas
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Menu Utama
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Data Jemaat', href: '/admin/members', icon: Users },
              { title: 'Keluarga', href: '/admin/families', icon: Home },
              { title: 'Kelompok Sel', href: '/admin/church-groups', icon: Users2 },
              { title: 'Baptisan', href: '/admin/baptisms', icon: Droplet },
              { title: 'Warta', href: '/admin/posts', icon: FileText },
              { title: 'Pengaturan', href: '/admin/settings', icon: Calendar }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-3 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-lg transition-all group"
              >
                <div className="p-4 bg-church-green/10 group-hover:bg-church-green rounded-xl transition-colors">
                  <link.icon className="w-8 h-8 text-church-green group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {link.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Fitur dalam pengembangan
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Dashboard ini adalah versi demo. Fitur-fitur lengkap seperti CRUD data jemaat, manajemen keluarga, kelompok sel, dan warta sedang dalam pengembangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
