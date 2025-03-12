import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/upload-file')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {}

  @Post('/upload-files')
  async uploadFiles(@UploadedFiles() files: Express.Multer.File) {}

  @Post('/retrieve-file/:file-id')
  async retrieveFile(@Param('file-id') fileId: string) {}

  @Post('/retrieve-files/:user-id')
  async retrieveFiles(@Param('user-id') userId: string) {}
}
