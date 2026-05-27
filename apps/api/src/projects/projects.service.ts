import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(
    dto: CreateProjectDto,
    currentUser: any,
  ) {
    // IMPORTANT BUSINESS RULE
    // Cannot complete project without proof

    if (dto.status === 'COMPLETED') {
      throw new BadRequestException(
        'Project cannot be created as completed',
      );
    }

    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        dueDate: dto.dueDate
          ? new Date(dto.dueDate)
          : null,

        createdById: currentUser.id,
      },
    });
  }

  async findAllProjects() {
    return this.prisma.project.findMany({
      include: {
        createdBy: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}