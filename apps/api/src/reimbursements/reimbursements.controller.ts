import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { ReimbursementsService } from './reimbursements.service';

@Controller('reimbursements')
export class ReimbursementsController {
  constructor(
    private reimbursementsService: ReimbursementsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReimbursement(
    @CurrentUser() currentUser: any,

    @Body()
    body: any,
  ) {
    return this.reimbursementsService.createReimbursement(
      currentUser,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyReimbursements(
    @CurrentUser() currentUser: any,
  ) {
    return this.reimbursementsService.getMyReimbursements(
      currentUser.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending')
  async getPendingReimbursements(
    @CurrentUser() currentUser: any,
  ) {
    return this.reimbursementsService.getPendingReimbursements(
      currentUser,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/review')
  async reviewReimbursement(
    @CurrentUser() currentUser: any,

    @Param('id') id: string,

    @Body()
    body: {
      status:
        | 'APPROVED'
        | 'REJECTED';
    },
  ) {
    return this.reimbursementsService.reviewReimbursement(
      currentUser,
      id,
      body.status,
    );
  }
}