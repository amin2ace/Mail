import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from './config/validation-schema.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './config/typeorm-options.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptions,
    }),
    MailModule,
    UploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
