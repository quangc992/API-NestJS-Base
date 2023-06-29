import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MailGoogleService } from '../service/mailGoogle.service';
import { SendMailDto, ReadMailDto } from '../dto/index.dto';

@ApiTags('mail-google')
@Controller('mail-google')
export class MailGoogleController {
  constructor(
    private readonly mailGoogleService: MailGoogleService
  ) { }

  @ApiOperation({ summary: 'Send an email. Gmail Google' })
  @Post('send')
  async send(@Body() payload: SendMailDto) {
    return await this.mailGoogleService.sendMail(payload);
  }

  // @Post('read')
  // async sends(@Body() payload: ReadMailDto) {
  //   return await this.mailGoogleService.checkReplyByMessageId(payload);
  // }
}
