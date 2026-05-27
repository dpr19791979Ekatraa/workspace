import { Module } from '@nestjs/common';

import { NotificationsController } from './notifications.controller';

import { NotificationsService } from './notifications.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService,RealtimeGateway,],
  exports: [NotificationsService],
})
export class NotificationsModule {}