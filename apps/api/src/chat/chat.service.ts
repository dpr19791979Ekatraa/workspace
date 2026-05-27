import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Injectable()
export class ChatService {
  constructor(
  private prisma: PrismaService,

  private realtimeGateway: RealtimeGateway,
) {}

  async createDirectChat(
    currentUserId: string,

    targetUserId: string,
  ) {
    if (
      currentUserId ===
      targetUserId
    ) {
      throw new BadRequestException(
        'Cannot chat with yourself',
      );
    }

    const existingChat =
      await this.prisma.chat.findFirst({
        where: {
          isGroup: false,

          members: {
            every: {
              userId: {
                in: [
                  currentUserId,
                  targetUserId,
                ],
              },
            },
          },
        },

        include: {
          members: true,
        },
      });

    if (existingChat) {
      return existingChat;
    }

    return this.prisma.chat.create({
      data: {
        isGroup: false,

        members: {
          create: [
            {
              userId:
                currentUserId,
            },

            {
              userId:
                targetUserId,
            },
          ],
        },
      },

      include: {
        members: true,
      },
    });
  }

  async getUserChats(userId: string) {
    return this.prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },

      include: {
        members: {
          include: {
            user: true,
          },
        },

        messages: {
          orderBy: {
            createdAt: 'desc',
          },

          take: 1,
        },
      },

      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
  async sendMessage(
  currentUserId: string,

  chatId: string,

  content: string,
) {
  const chat =
    await this.prisma.chat.findUnique({
      where: { id: chatId },

      include: {
        members: true,
      },
    });

  if (!chat) {
    throw new BadRequestException(
      'Chat not found',
    );
  }

  const isMember =
    chat.members.some(
      member =>
        member.userId ===
        currentUserId,
    );

  if (!isMember) {
    throw new BadRequestException(
      'Access denied',
    );
  }

  const message =
    await this.prisma.message.create({
      data: {
        content,

        chatId,

        senderId: currentUserId,
      },

      include: {
        sender: true,
      },
    });

  this.realtimeGateway.sendMessageToChat(
    chatId,
    message,
  );

  return message;
}
}