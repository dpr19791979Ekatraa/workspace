import {
  Body,
  Controller,
 Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';

import { TasksService } from './tasks.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createTask(
    @Body() dto: CreateTaskDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.tasksService.createTask(
      dto,
      currentUser,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(
      id,
      dto,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async findAllTasks() {
    return this.tasksService.findAllTasks();
  }
}