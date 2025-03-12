interface IUploadService {
  addFileToDatabase(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ fileId: string }>;

  retrieveFile(fileId: string, userId: string): Promise<Express.Multer.File>;

  retrieveFiles(userId: string): Promise<Express.Multer.File[]>;

  checkAccess(fileId: string, userId: string): Promise<Boolean>;

  getFilePath(file: Express.Multer.File): Promise<{ filePath: string }>;

  downloadFile(file: Express.Multer.File): Promise<void>;

  downloadFiles(files: Express.Multer.File[]): Promise<void>;
}
