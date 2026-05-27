import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ProjectPriority,
  ProjectStatus,
} from '@prisma/client';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsEnum(ProjectPriority)
  priority?: ProjectPriority;

  @IsOptional()
  dueDate?: Date;

  @IsOptional()
  @IsString()
  completionNote?: string;

  @IsOptional()
  @IsString()
  completionFile?: string;
}