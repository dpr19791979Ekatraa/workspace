import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(
    private calendarService: CalendarService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('upcoming')
  async getUpcomingEvents() {
    return this.calendarService.getUpcomingEvents();
  }
}