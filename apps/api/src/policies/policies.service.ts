import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PoliciesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createPolicy(
    currentUser: any,

    body: {
      title: string;

      content: string;

      category: string;
    },
  ) {
    // Only Admin/HR/Super Admin
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

    return this.prisma.policy.create({
      data: {
        title: body.title,

        content: body.content,

        category:
          body.category as any,

        createdById:
          currentUser.id,
      },
    });
  }

  async getPolicies() {
    return this.prisma.policy.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPoliciesByCategory(
    category: string,
  ) {
    return this.prisma.policy.findMany({
      where: {
        category:
          category as any,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}