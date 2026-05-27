import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Injectable()
export class NotificationsService {
  constructor(
  private prisma: PrismaService,

  private realtimeGateway: RealtimeGateway,
) {}

  async createNotification(
  userId: string,

  title: string,

  message: string,
) {
  const notification =
    await this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
      },
    });

  this.realtimeGateway.sendNotificationToUser(
    userId,
    notification,
  );

  return notification;
}

  async getUserNotifications(
    userId: string,
  ) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },

      data: {
        isRead: true,
      },
    });
  }
}