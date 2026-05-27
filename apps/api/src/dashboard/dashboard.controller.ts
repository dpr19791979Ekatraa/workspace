import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('employee')
  async getEmployeeDashboard(
    @CurrentUser() currentUser: any,
  ) {
    return this.dashboardService.getEmployeeDashboard(
      currentUser,
    );
  }
}