import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import validationSchema from './config/validation-schema.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './config/typeorm-options.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // For recent error it should imported firs of all modules
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptions,
    }),
    MailModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
