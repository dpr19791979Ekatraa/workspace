import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    private prisma: PrismaService,

    private notificationsService: NotificationsService,
  ) {}

  async createAnnouncement(
    currentUser: any,

    body: {
      title: string;

      content: string;
    },
  ) {
    // Only HR/Admin/Super Admin
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

    const announcement =
      await this.prisma.announcement.create({
        data: {
          title: body.title,

          content: body.content,

          createdById:
            currentUser.id,
        },
      });

    // Notify all active users
    const users =
      await this.prisma.user.findMany({
        where: {
          isActive: true,
        },
      });

    for (const user of users) {
      await this.notificationsService.createNotification(
        user.id,

        'Company Announcement',

        body.title,
      );
    }

    return announcement;
  }

  async getAnnouncements() {
    return this.prisma.announcement.findMany({
      include: {
        createdBy: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}