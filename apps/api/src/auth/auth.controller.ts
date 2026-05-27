// import { Body, Controller, Post } from '@nestjs/common';

// import { AuthService } from './auth.service';
// import { LoginDto } from '../users/dto/login.dto';
// import { Get, UseGuards } from '@nestjs/common';

// import { JwtAuthGuard } from './jwt-auth.guard';

// import { CurrentUser } from '../common/decorators/current-user.decorator';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(@Body() dto: LoginDto) {
//     return this.authService.login(
//       dto.email,
//       dto.password,
//     );
//   }
//   @UseGuards(JwtAuthGuard)
// @Get('me')
// async getProfile(
//   @CurrentUser() user: any,
// ) {
//   return user;
// }
// }

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { ClerkAuthGuard } from './guards/clerk-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('sync')
  syncUser(
    @Body() body: any,
  ) {
    return this.authService.syncUser(
      body,
    );
  }

  @UseGuards(
    ClerkAuthGuard,
  )
  @Get('me')
  async getProfile(
    @Req() req: any,
  ) {
    return this.authService.getUserByClerkId(
      req.auth.userId,
    );
  }
}