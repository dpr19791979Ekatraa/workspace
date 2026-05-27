import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TasksService {
  // constructor(private prisma: PrismaService) {}
constructor(
  private prisma: PrismaService,

  private notificationsService: NotificationsService,
) {}
  async createTask(
    dto: CreateTaskDto,
    currentUser: any,
  ) {
    // IMPORTANT RULE
    // Cannot directly create completed task

    if (dto.status === 'COMPLETED') {
      throw new BadRequestException(
        'Task cannot be created as completed',
      );
    }

    const task =
  await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,

        dueDate: dto.dueDate
          ? new Date(dto.dueDate)
          : null,

        projectId: dto.projectId,

        assignedToId: dto.assignedToId,

        createdById: currentUser.id,
      },
    });
  }

  async updateTask(
    id: string,
    dto: UpdateTaskDto,
  ) {
    // YOUR MOST IMPORTANT BUSINESS RULE

    if (dto.status === 'COMPLETED') {
      if (
        !dto.completionNote ||
        !dto.completionFile
      ) {
        throw new BadRequestException(
          'Completion note and proof file are mandatory before completing task',
        );
      }
    }

    return this.prisma.task.update({
      where: { id },

      data: {
        ...dto,

        completedAt:
          dto.status === 'COMPLETED'
            ? new Date()
            : null,
      },
    });
  }

  async findAllTasks() {
    return this.prisma.task.findMany({
      include: {
        project: true,
        assignedTo: true,
        createdBy: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}