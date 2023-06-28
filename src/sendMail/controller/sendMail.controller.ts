import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendMailService } from '../service/sendMail.service';
import { SendMailDto } from '../dto/sendMail.dto';

@Controller('send-mail')
export class SendMailController {
  constructor(
    private readonly sendMailService: SendMailService
  ) { }

  @ApiTags('send-mail')
  @ApiOperation({ summary: 'Send an email. We only support sending' })
  @Post('send')
  async send(@Body() payload: SendMailDto) {
    return await this.sendMailService.sendEmail(payload);
  }
}
