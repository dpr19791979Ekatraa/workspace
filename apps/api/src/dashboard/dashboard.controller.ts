import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { DashboardService } from './dashboard.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Get('employee')
  async getEmployeeDashboard(
    @CurrentUser() currentUser: any,
  ) {
    return this.dashboardService.getEmployeeDashboard(
      currentUser,
    );
  }
}