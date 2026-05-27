import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClerkAuthGuard } from 'src/auth/guards/clerk-auth.guard';

@Controller('uploads')
export class UploadsController {
  @UseGuards(ClerkAuthGuard)  
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',

        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9);

          callback(
            null,
            uniqueName +
              extname(file.originalname),
          );
        },
      }),

      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (
          !allowedTypes.includes(
            file.mimetype,
          )
        ) {
          return callback(
            new BadRequestException(
              'Invalid file type',
            ),
            false,
          );
        }

        callback(null, true);
      },

      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      fileUrl:
        'http://localhost:3001/uploads/' +
        file.filename,
    };
  }
}