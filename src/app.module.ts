import { AwsModule } from './aws/aws.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/app.module';
import { MailGoogleModule } from './mailGoogle/mailGoogle.module'
import { MailTmModule } from './mailTemporary/mail.module';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AwsModule, PrismaModule, MailGoogleModule, AuthModule, MailTmModule],
  providers: [ConfigService]
})
export class AppModule { }
