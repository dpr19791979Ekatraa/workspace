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

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
  ) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllTasks() {
    return this.tasksService.findAllTasks();
  }
}