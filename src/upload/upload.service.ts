import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import IUploadService from './interface/upload-service.interface';

@Injectable()
export class UploadService implements IUploadService {
  constructor(
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
  ) {}

  async addFileToDatabase(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ fileId: string }> {
    const fileRecord = this.fileRepo.create({
      fileSize: `${file.size / 1024} KB`, // File size in KB
      fileOldName: file.originalname,
      fileNewName: file.filename,
      userId,
    });

    try {
      await this.fileRepo.save(fileRecord);
      return { fileId: fileRecord.fileId };
    } catch (error) {
      throw new ForbiddenException('File Record Creation Failed', {
        description: error,
      });
    }
  }
  async retrieveFile(fileId: string, userId: string): Promise<File> {
    const storedFile = this.fileRepo.findOne({
      where: {
        fileId,
        userId,
      },
    });

    if (!storedFile) {
      throw new UnauthorizedException('Requested File Not Found');
    }

    return storedFile;
  }

  async retrieveFiles(userId: string): Promise<File[]> {
    const files = await this.fileRepo.find({
      where: {
        userId,
      },
    });
    return files;
  }

  async checkAccess(fileId: string, userId: string): Promise<Boolean> {
    const storedFile = await this.fileRepo.findOne({
      where: {
        fileId,
      },
    });

    if (storedFile.userId !== userId) {
      throw new ForbiddenException('File Access Denied');
    }
    return true;
  }

  getFilePath(file: Express.Multer.File): Promise<{ filePath: string }> {
    throw new Error('Method not implemented.');
  }
  downloadFile(file: Express.Multer.File): Promise<void> {
    throw new Error('Method not implemented.');
  }
  downloadFiles(files: Express.Multer.File[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
