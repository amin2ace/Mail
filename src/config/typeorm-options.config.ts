import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { File } from 'src/upload/file.entity';

export class TypeOrmOptions implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.configService.get<string>('DATABASE_TYPE'),
      synchronize: true,
      entities: [File],
    };
  }
}
