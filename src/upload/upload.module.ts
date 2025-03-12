import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterService } from '../multer.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: MulterService }),
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
