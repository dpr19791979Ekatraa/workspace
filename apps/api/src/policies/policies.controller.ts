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

import { PoliciesService } from './policies.service';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('policies')
export class PoliciesController {
  constructor(
    private policiesService: PoliciesService,
  ) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async createPolicy(
    @CurrentUser() currentUser: any,

    @Body()
    body: {
      title: string;

      content: string;

      category: string;
    },
  ) {
    return this.policiesService.createPolicy(
      currentUser,
      body,
    );
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async getPolicies() {
    return this.policiesService.getPolicies();
  }

  @UseGuards(ClerkAuthGuard)
  @Get(':category')
  async getPoliciesByCategory(
    @Param('category')
    category: string,
  ) {
    return this.policiesService.getPoliciesByCategory(
      category,
    );
  }
}