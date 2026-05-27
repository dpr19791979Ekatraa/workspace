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

import { LeavesService } from './leaves.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('leaves')
export class LeavesController {
  constructor(private leavesService: LeavesService) {}

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getLeaves(@CurrentUser() currentUser: any) {
    return this.leavesService.getLeaves(currentUser);
  }

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createLeave(
    @CurrentUser() currentUser: any,
    @Body()
    body: {
      leaveType: string;
      reason: string;
      startDate: string;
      endDate: string;
    },
  ) {
    return this.leavesService.createLeave(currentUser, body);
  }

  @UseGuards(ClerkAuthGuard)
  @Patch(':id')
  async updateLeave(
    @CurrentUser() currentUser: any,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.leavesService.updateLeave(currentUser, id, body);
  }
}
