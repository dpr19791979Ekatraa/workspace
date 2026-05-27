import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeavesService {
  constructor(private prisma: PrismaService) {}

  async getLeaves(currentUser: any) {
    const isPrivileged = ['SUPER_ADMIN', 'ADMIN', 'HR'].includes(
      currentUser.role,
    );

    return this.prisma.leaveRequest.findMany({
      where: isPrivileged
        ? {}
        : {
            employeeId: currentUser.id,
          },
      include: {
        employee: true,
        reviewedBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createLeave(
    currentUser: any,
    body: {
      leaveType: string;
      reason: string;
      startDate: string;
      endDate: string;
    },
  ) {
    return this.prisma.leaveRequest.create({
      data: {
        leaveType: body.leaveType as any,
        reason: body.reason,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        employeeId: currentUser.id,
      },
      include: {
        employee: true,
      },
    });
  }

  async updateLeave(currentUser: any, id: string, body: any) {
    const existingLeave = await this.prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (!existingLeave) {
      throw new BadRequestException('Leave not found');
    }

    const canEdit =
      existingLeave.employeeId === currentUser.id ||
      ['SUPER_ADMIN', 'ADMIN', 'HR'].includes(currentUser.role);

    if (!canEdit) {
      throw new BadRequestException('Access denied');
    }

    const data: any = { ...body };

    if (body.startDate) {
      data.startDate = new Date(body.startDate);
    }

    if (body.endDate) {
      data.endDate = new Date(body.endDate);
    }

    return this.prisma.leaveRequest.update({
      where: { id },
      data,
      include: {
        employee: true,
        reviewedBy: true,
      },
    });
  }
}
