import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CalendarService } from './calendar.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('calendar')
export class CalendarController {
  constructor(
    private calendarService: CalendarService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Get('upcoming')
  async getUpcomingEvents() {
    return this.calendarService.getUpcomingEvents();
  }
}