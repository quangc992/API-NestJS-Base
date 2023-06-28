import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/app.module';
import { SendMailModule } from './sendMail/sendMail.module'

@Module({
  imports: [PrismaModule, SendMailModule, AuthModule], //AuthModule
  controllers: [],
  providers: [],
})
export class AppModule { }
