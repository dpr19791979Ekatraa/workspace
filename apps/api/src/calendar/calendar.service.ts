import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getUpcomingEvents() {
    const today = new Date();

    return this.prisma.calendarEvent.findMany({
      where: {
        eventDate: {
          gte: today,
        },
      },

      include: {
        user: true,
      },

      orderBy: {
        eventDate: 'asc',
      },

      take: 10,
    });
  }
}