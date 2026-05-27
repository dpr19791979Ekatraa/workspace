import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getEmployeeDashboard(
    currentUser: any,
  ) {
    const totalTasks =
      await this.prisma.task.count({
        where: {
          assignedToId: currentUser.id,
        },
      });

    const completedTasks =
      await this.prisma.task.count({
        where: {
          assignedToId: currentUser.id,
          status: 'COMPLETED',
        },
      });

    const pendingTasks =
      await this.prisma.task.count({
        where: {
          assignedToId: currentUser.id,
          NOT: {
            status: 'COMPLETED',
          },
        },
      });

    const activeProjects =
      await this.prisma.project.count({
        where: {
          status: 'ACTIVE',
        },
      });

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks /
              totalTasks) *
              100,
          );

    const taskStatusBreakdown =
      await this.prisma.task.groupBy({
        by: ['status'],

        where: {
          assignedToId: currentUser.id,
        },

        _count: true,
      });

    return {
      metrics: {
        totalTasks,
        completedTasks,
        pendingTasks,
        activeProjects,
        completionRate,
      },

      taskStatusBreakdown,
    };
  }
}