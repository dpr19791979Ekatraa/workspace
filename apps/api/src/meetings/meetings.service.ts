import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MeetingsService {
  constructor(
    private prisma: PrismaService,

    private notificationsService: NotificationsService,
  ) {}

  async createMeeting(
    currentUser: any,

    body: {
      title: string;

      description?: string;

      participantIds: string[];

      scheduledFor?: string;
    },
  ) {
    const roomId =
      'ekatraa-' +
      Date.now();

    const meetingLink =
      `https://meet.jit.si/${roomId}`;

    const meeting =
      await this.prisma.meeting.create({
        data: {
          title: body.title,

          description:
            body.description,

          roomId,

          meetingLink,

          scheduledFor:
            body.scheduledFor
              ? new Date(
                  body.scheduledFor,
                )
              : null,

          createdById:
            currentUser.id,

          participants: {
            create:
              body.participantIds.map(
                userId => ({
                  userId,
                }),
              ),
          },
        },

        include: {
          participants: true,
        },
      });

    // Send notifications
    for (const userId of body.participantIds) {
      await this.notificationsService.createNotification(
        userId,

        'Meeting Invitation',

        `You have been invited to meeting: ${body.title}`,
      );
    }

    return meeting;
  }

  async getMyMeetings(
    currentUserId: string,
  ) {
    return this.prisma.meeting.findMany({
      where: {
        OR: [
          {
            createdById:
              currentUserId,
          },

          {
            participants: {
              some: {
                userId:
                  currentUserId,
              },
            },
          },
        ],
      },

      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}