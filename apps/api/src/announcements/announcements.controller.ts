import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { AnnouncementsService } from './announcements.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('announcements')
export class AnnouncementsController {
  constructor(
    private announcementsService: AnnouncementsService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createAnnouncement(
    @CurrentUser() currentUser: any,

    @Body()
    body: {
      title: string;

      content: string;
    },
  ) {
    return this.announcementsService.createAnnouncement(
      currentUser,
      body,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getAnnouncements() {
    return this.announcementsService.getAnnouncements();
  }
}