import { LucideIcon } from 'lucide-react';

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
      <div className={`bg-gradient-to-br ${colorClasses[color]} p-6 text-white`}>
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
