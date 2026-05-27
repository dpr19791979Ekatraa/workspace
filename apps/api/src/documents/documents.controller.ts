import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { DocumentsService } from './documents.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(
    private documentsService: DocumentsService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createDocument(
    @CurrentUser() currentUser: any,

    @Body()
    body: any,
  ) {
    return this.documentsService.createDocument(
      currentUser,
      body,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getDocuments(
    @CurrentUser() currentUser: any,
  ) {
    return this.documentsService.getAccessibleDocuments(
      currentUser,
    );
  }
}