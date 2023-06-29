import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/app.module';
import { MailGoogleModule } from './mailGoogle/mailGoogle.module'
import { MailTmModule } from './mailTemporary/mail.module';

@Module({
  imports: [PrismaModule, MailGoogleModule, AuthModule, MailTmModule],
})
export class AppModule { }
