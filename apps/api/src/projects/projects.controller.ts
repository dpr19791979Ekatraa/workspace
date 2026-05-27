import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { ProjectsService } from './projects.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createProject(
    @Body() dto: CreateProjectDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.projectsService.createProject(
      dto,
      currentUser,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async findAllProjects() {
    return this.projectsService.findAllProjects();
  }
}