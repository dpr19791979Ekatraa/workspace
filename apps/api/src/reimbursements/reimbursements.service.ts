import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReimbursementsService {
  constructor(
    private prisma: PrismaService,

    private notificationsService: NotificationsService,
  ) {}

  async createReimbursement(
    currentUser: any,

    body: {
      category: string;

      amount: number;

      currency: string;

      expenseDate: string;

      description: string;

      receiptFile: string;
    },
  ) {
    // Mandatory receipt validation
    if (!body.receiptFile) {
      throw new BadRequestException(
        'Receipt upload is mandatory',
      );
    }

    const reimbursement =
      await this.prisma.reimbursement.create({
        data: {
          category:
            body.category as any,

          amount: body.amount,

          currency: body.currency,

          expenseDate: new Date(
            body.expenseDate,
          ),

          description:
            body.description,

          receiptFile:
            body.receiptFile,

          employeeId:
            currentUser.id,
        },
      });

    // Notify HR/Admins
    const reviewers =
      await this.prisma.user.findMany({
        where: {
          role: {
            in: [
              'SUPER_ADMIN',
              'ADMIN',
              'HR',
            ],
          },
        },
      });

    for (const reviewer of reviewers) {
      await this.notificationsService.createNotification(
        reviewer.id,

        'New Reimbursement Request',

        `${currentUser.name} submitted reimbursement`,
      );
    }

    return reimbursement;
  }

  async getMyReimbursements(
    currentUserId: string,
  ) {
    return this.prisma.reimbursement.findMany({
      where: {
        employeeId:
          currentUserId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPendingReimbursements(
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

    return this.prisma.reimbursement.findMany({
      where: {
        status: 'PENDING',
      },

      include: {
        employee: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async reviewReimbursement(
    currentUser: any,

    reimbursementId: string,

    status:
      | 'APPROVED'
      | 'REJECTED',
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

    const reimbursement =
      await this.prisma.reimbursement.update({
        where: {
          id: reimbursementId,
        },

        data: {
          status,

          reviewedById:
            currentUser.id,

          reviewedAt:
            new Date(),
        },

        include: {
          employee: true,
        },
      });

    await this.notificationsService.createNotification(
      reimbursement.employeeId,

      'Reimbursement Updated',

      `Your reimbursement was ${status}`,
    );

    return reimbursement;
  }
}