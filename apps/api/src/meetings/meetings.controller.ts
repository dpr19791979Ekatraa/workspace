import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { MeetingsService } from './meetings.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('meetings')
export class MeetingsController {
  constructor(
    private meetingsService: MeetingsService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createMeeting(
    @CurrentUser() currentUser: any,

    @Body()
    body: {
      title: string;

      description?: string;

      participantIds: string[];

      scheduledFor?: string;
    },
  ) {
    return this.meetingsService.createMeeting(
      currentUser,
      body,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getMyMeetings(
    @CurrentUser() currentUser: any,
  ) {
    return this.meetingsService.getMyMeetings(
      currentUser.id,
    );
  }
}