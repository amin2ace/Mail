import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import validationSchema from './config/validation-schema.config';

@Module({
  imports: [
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
