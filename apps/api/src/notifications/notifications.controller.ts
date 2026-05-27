import {
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { NotificationsService } from './notifications.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getNotifications(
    @CurrentUser() currentUser: any,
  ) {
    return this.notificationsService.getUserNotifications(
      currentUser.id,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: string,
  ) {
    return this.notificationsService.markAsRead(
      id,
    );
  }
}