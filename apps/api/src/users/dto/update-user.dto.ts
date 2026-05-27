import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { Role } from '../../common/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
@IsString()
phone?: string;

@IsOptional()
@IsString()
relationshipStatus?: string;

@IsOptional()
@IsString()
fatherName?: string;

@IsOptional()
@IsString()
motherName?: string;

@IsOptional()
@IsString()
spouseName?: string;

@IsOptional()
@IsString()
emergencyContact?: string;

@IsOptional()
childrenCount?: number;

@IsOptional()
@IsString()
whatsappNumber?: string;

@IsOptional()
birthday?: string;

@IsOptional()
marriageDate?: string;

@IsOptional()
joiningDate?: string;
}