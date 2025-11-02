'use server';

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
        select: {
          id: true,
          name: true,
          members: {
            select: {
              id: true
            }
          }
        }
      })
    ]);

    // Format group distribution for charts
    const groupDistributionData = groupDistribution.map(group => ({
      name: group.name,
      count: group.members?.length || 0
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
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    
    // Return default values on error instead of throwing
    return {
      totalMembers: 0,
      totalFamilies: 0,
      totalBaptisms: 0,
      totalPosts: 0,
      baptismsThisMonth: 0,
      birthdaysThisMonth: 0,
      groupDistribution: [],
      recentActivity: []
    };
  }
}
