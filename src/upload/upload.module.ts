import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterService } from './multer.service';

@Module({
  imports: [MulterModule.registerAsync({ useClass: MulterService })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
