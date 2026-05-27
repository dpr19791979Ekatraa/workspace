import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async syncUser(data: any) {
    const existingUser =
      await this.prisma.user.findUnique(
        {
          where: {
            clerkUserId:
              data.clerkUserId,
          },
        },
      );

    if (existingUser) {
      return existingUser;
    }

    return this.prisma.user.create({
      data: {
        clerkUserId:
          data.clerkUserId,

        email: data.email,

        name: data.name,

        role: 'EMPLOYEE',
      },
    });
  }

  async getUserByClerkId(
    clerkUserId: string,
  ) {
    return this.prisma.user.findUnique(
      {
        where: {
          clerkUserId,
        },
      },
    );
  }
}