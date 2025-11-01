/**
 * 📊 DASHBOARD GENERATOR
 * Auto-generates dashboard with statistics and charts
 */

import * as fs from 'fs';
import * as path from 'path';

export async function generateDashboard(projectRoot: string) {
  // Generate dashboard page
  const dashboardDir = path.join(projectRoot, 'app', 'admin', 'dashboard');
  fs.mkdirSync(dashboardDir, { recursive: true });
  fs.writeFileSync(path.join(dashboardDir, 'page.tsx'), generateDashboardPage());

  // Generate dashboard actions
  const actionsDir = path.join(projectRoot, 'app', 'actions');
  fs.mkdirSync(actionsDir, { recursive: true });
  fs.writeFileSync(path.join(actionsDir, 'dashboard.ts'), generateDashboardActions());

  // Generate StatCard component
  const componentsDir = path.join(projectRoot, 'components', 'dashboard');
  fs.mkdirSync(componentsDir, { recursive: true });
  fs.writeFileSync(path.join(componentsDir, 'StatCard.tsx'), generateStatCard());

  // Generate ChartGroup component
  fs.writeFileSync(path.join(componentsDir, 'ChartGroup.tsx'), generateChartGroup());
}

function generateDashboardPage(): string {
  return `'use client';

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
            Akses Cepat
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Jemaat', href: '/admin/members', icon: Users, color: 'green' },
              { title: 'Keluarga', href: '/admin/families', icon: Home, color: 'blue' },
              { title: 'Kelompok', href: '/admin/church-groups', icon: Users2, color: 'purple' },
              { title: 'Baptisan', href: '/admin/baptisms', icon: Droplet, color: 'cyan' },
              { title: 'Warta', href: '/admin/posts', icon: FileText, color: 'orange' },
              { title: 'Ulang Tahun', href: '/admin/birthdays', icon: Calendar, color: 'pink' }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all"
              >
                <div className={\`p-3 bg-\${link.color}-500/10 rounded-lg\`}>
                  <link.icon className={\`w-6 h-6 text-\${link.color}-500\`} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  {link.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
}

function generateDashboardActions(): string {
  return `'use server';

import { prisma } from '@/lib/prisma';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function getDashboardStats() {
  try {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Get all stats in parallel
    const [
      totalMembers,
      totalFamilies,
      totalBaptisms,
      totalPosts,
      baptismsThisMonth,
      birthdaysThisMonth,
      groupDistribution
    ] = await Promise.all([
      // Total members
      prisma.member.count({ where: { deletedAt: null } }),
      
      // Total families
      prisma.family.count({ where: { deletedAt: null } }),
      
      // Total baptisms
      prisma.baptism.count({ where: { deletedAt: null } }),
      
      // Total posts
      prisma.post.count({ where: { deletedAt: null } }),
      
      // Baptisms this month
      prisma.baptism.count({
        where: {
          deletedAt: null,
          baptismDate: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      }),
      
      // Birthdays this month
      prisma.member.count({
        where: {
          deletedAt: null,
          birthDate: {
            not: null
          }
        }
      }),
      
      // Group distribution
      prisma.churchGroup.findMany({
        where: { deletedAt: null },
        include: {
          _count: {
            select: { members: true }
          }
        }
      })
    ]);

    // Format group distribution for charts
    const groupDistributionData = groupDistribution.map(group => ({
      name: group.name,
      count: group._count.members
    }));

    // Mock recent activity (you can implement proper activity logging)
    const recentActivity = [
      { action: 'Jemaat baru ditambahkan', timestamp: 'Baru saja' },
      { action: 'Data keluarga diperbarui', timestamp: '5 menit lalu' },
      { action: 'Baptisan baru tercatat', timestamp: '1 jam lalu' },
      { action: 'Warta baru dipublikasi', timestamp: '2 jam lalu' },
      { action: 'Kelompok sel diperbarui', timestamp: '3 jam lalu' }
    ];

    return {
      totalMembers,
      totalFamilies,
      totalBaptisms,
      totalPosts,
      baptismsThisMonth,
      birthdaysThisMonth,
      groupDistribution: groupDistributionData,
      recentActivity
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}
`;
}

function generateStatCard(): string {
  return `import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'cyan' | 'purple' | 'orange' | 'pink';
  trend?: string;
}

const colorClasses = {
  green: 'from-green-400 to-emerald-600',
  blue: 'from-blue-400 to-blue-600',
  cyan: 'from-cyan-400 to-cyan-600',
  purple: 'from-purple-400 to-purple-600',
  orange: 'from-orange-400 to-orange-600',
  pink: 'from-pink-400 to-pink-600'
};

export default function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
      <div className={\`bg-gradient-to-br \${colorClasses[color]} p-6 text-white\`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
            <p className="text-4xl font-bold">{value.toLocaleString('id-ID')}</p>
            {trend && (
              <p className="text-xs mt-2 opacity-80">
                {trend} dari bulan lalu
              </p>
            )}
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
`;
}

function generateChartGroup(): string {
  return `'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartGroupProps {
  data: { name: string; count: number }[];
}

export default function ChartGroup({ data }: ChartGroupProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Bar 
          dataKey="count" 
          fill="#009345" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
`;
}
