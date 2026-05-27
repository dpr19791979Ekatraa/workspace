import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  HR = 'HR',
  EMPLOYEE = 'EMPLOYEE',
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(RoleType)
  role?: RoleType;
  @IsOptional()
@IsDateString()
birthday?: string;

@IsOptional()
@IsDateString()
marriageDate?: string;

@IsOptional()
@IsDateString()
joiningDate?: string;
}