import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';

import { Role } from '../common/enums/role.enum';

import { RolesGuard } from '../common/guards/roles.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Param,
  Patch,
} from '@nestjs/common';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Post()
  async createUser(
    @Body() dto: CreateUserDto,
  ) {
    return this.usersService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Get()
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  // ADD IT HERE
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUserById(
    @Param('id') id: string,
  ) {
    return this.usersService.findUserById(id);
  }

  // UPDATE ROUTE BELOW
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.usersService.updateUser(
      id,
      dto,
      currentUser,
    );
  }
}