import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PerformanceService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private validateAccess(
    currentUser: any,
  ) {
    if (
      ![
        'SUPER_ADMIN',
        'ADMIN',
        'HR',
      ].includes(currentUser.role)
    ) {
      throw new BadRequestException(
        'Access denied',
      );
    }
  }

  async createPerformanceRecord(
    currentUser: any,

    body: {
      type: string;

      title: string;

      description?: string;

      employeeId: string;
    },
  ) {
    this.validateAccess(currentUser);

    return this.prisma.performance.create({
      data: {
        type: body.type as any,

        title: body.title,

        description:
          body.description,

        employeeId:
          body.employeeId,

        createdById:
          currentUser.id,
      },
    });
  }

  async getEmployeePerformance(
    currentUser: any,

    employeeId: string,
  ) {
    this.validateAccess(currentUser);

    return this.prisma.performance.findMany({
      where: {
        employeeId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllPerformanceRecords(
    currentUser: any,
  ) {
    this.validateAccess(currentUser);

    return this.prisma.performance.findMany({
      include: {
        employee: true,

        createdBy: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}