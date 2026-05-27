import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(
    private performanceService: PerformanceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPerformanceRecord(
    @CurrentUser() currentUser: any,

    @Body()
    body: any,
  ) {
    return this.performanceService.createPerformanceRecord(
      currentUser,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPerformanceRecords(
    @CurrentUser() currentUser: any,
  ) {
    return this.performanceService.getAllPerformanceRecords(
      currentUser,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':employeeId')
  async getEmployeePerformance(
    @CurrentUser() currentUser: any,

    @Param('employeeId')
    employeeId: string,
  ) {
    return this.performanceService.getEmployeePerformance(
      currentUser,
      employeeId,
    );
  }
}