import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { ChatService } from './chat.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post('direct')
  async createDirectChat(
    @CurrentUser() currentUser: any,

    @Body()
    body: {
      targetUserId: string;
    },
  ) {
    return this.chatService.createDirectChat(
      currentUser.id,

      body.targetUserId,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getMyChats(
    @CurrentUser() currentUser: any,
  ) {
    return this.chatService.getUserChats(
      currentUser.id,
    );
  }
  @UseGuards(ClerkAuthGuard)
@Post('message')
async sendMessage(
  @CurrentUser() currentUser: any,

  @Body()
  body: {
    chatId: string;

    content: string;
  },
) {
  return this.chatService.sendMessage(
    currentUser.id,

    body.chatId,

    body.content,
  );
}
}