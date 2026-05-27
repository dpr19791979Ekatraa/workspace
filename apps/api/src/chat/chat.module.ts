import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RealtimeGateway } from '../realtime/realtime.gateway';

@Module({
  providers: [ChatService,RealtimeGateway,],
  controllers: [ChatController]
})
export class ChatModule {}
