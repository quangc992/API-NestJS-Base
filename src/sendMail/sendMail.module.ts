import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common';

import { SendMailService } from './service/sendMail.service';
import { SendMailController } from './controller/sendMail.controller';
dotenv.config({ path: '.env.gmail' });

@Module({
  imports: [],
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule { }
