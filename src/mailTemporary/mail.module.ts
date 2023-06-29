import { Module } from '@nestjs/common';

import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { CallApiMail } from './callMailTm/callMailTm';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService, CallApiMail],
})
export class MailTmModule { }