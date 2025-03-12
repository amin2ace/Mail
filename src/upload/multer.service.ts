import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: this.configService.get<string>('UPLOAD_DIR'),
        filename(req, file, callback) {
          const fileOldName = file.originalname;

          try {
            // const userId = req['userId']
            const fileExtension = extname(fileOldName);
            const fileNewName = `${Math.random() * 66666}.${Date.now()}.${fileExtension}`;
            callback(null, fileNewName);
          } catch (error) {
            callback(
              new ForbiddenException('File Rename Failed', {
                description: error,
              }),
              fileOldName,
            );
          }
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB,
      },
      fileFilter(req, file, callback) {
        const validExtensions = ['.png', '.jpeg', '.jpg'];
        const fileExtension = extname(file.originalname).toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
          callback(
            new ForbiddenException(
              `Only files with extensions of ${validExtensions} are allowed`,
            ),
            false,
          );
        }
        callback(null, true);
      },
    };
  }
}
