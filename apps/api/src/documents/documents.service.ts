import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createDocument(
    currentUser: any,

    body: {
      fileName: string;

      description?: string;

      fileUrl?: string;

      externalUrl?: string;

      visibility: string;
    },
  ) {
    if (
      !body.fileUrl &&
      !body.externalUrl
    ) {
      throw new BadRequestException(
        'Either file or external URL is required',
      );
    }

    return this.prisma.document.create({
      data: {
        fileName: body.fileName,

        description:
          body.description,

        fileUrl: body.fileUrl,

        externalUrl:
          body.externalUrl,

        visibility:
          body.visibility as any,

        uploadedById:
          currentUser.id,
      },
    });
  }

  async getAccessibleDocuments(
    currentUser: any,
  ) {
    const visibilityRules = [
      'ALL_EMPLOYEES',
    ];

    if (
      currentUser.role ===
      'ADMIN'
    ) {
      visibilityRules.push(
        'ADMIN',
      );
    }

    if (
      currentUser.role === 'HR'
    ) {
      visibilityRules.push('HR');
    }

    if (
      currentUser.role ===
      'SUPER_ADMIN'
    ) {
      visibilityRules.push(
        'SUPER_ADMIN',
        'ADMIN',
        'HR',
      );
    }

    return this.prisma.document.findMany({
      where: {
        visibility: {
          in: visibilityRules as any,
        },
      },

      include: {
        uploadedBy: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}