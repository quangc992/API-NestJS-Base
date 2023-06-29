import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common';

import { MailGoogleService } from './service/mailGoogle.service';
import { MailGoogleController } from './controller/mailGoogle.controller';
dotenv.config({ path: '.env.gmail' });

@Module({
  controllers: [MailGoogleController],
  providers: [MailGoogleService],
})

export class MailGoogleModule { }