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

@Controller('documents')
export class DocumentsController {
  constructor(
    private documentsService: DocumentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDocuments(
    @CurrentUser() currentUser: any,
  ) {
    return this.documentsService.getAccessibleDocuments(
      currentUser,
    );
  }
}