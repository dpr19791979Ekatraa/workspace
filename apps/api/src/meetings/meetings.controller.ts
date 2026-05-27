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

@Controller('meetings')
export class MeetingsController {
  constructor(
    private meetingsService: MeetingsService,
  ) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyMeetings(
    @CurrentUser() currentUser: any,
  ) {
    return this.meetingsService.getMyMeetings(
      currentUser.id,
    );
  }
}