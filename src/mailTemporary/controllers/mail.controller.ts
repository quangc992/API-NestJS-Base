import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MailService } from '../services/mail.service';
import { API_FormatCreateDTO, FormatCreateDTO, TokenAndIdDTO, TokenAndNumberPageDTO } from '../dto/index.dto';

@ApiTags('virtual-gmail')
@Controller('virtual-gmail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ){}

  @ApiOperation({ summary: 'Create gmail automatically or custom mail' })
  @Post('account')
  async createAccount(@Body() payload: FormatCreateDTO): Promise<object> {
    return await this.mailService.create(payload);
  }

  @ApiOperation({ summary: 'Disable mail' })
  @Delete('account')
  async removeAccount(@Body() payload: TokenAndIdDTO): Promise<object> {
    return await this.mailService.remove(payload);
  }

  @ApiOperation({ summary: 'Get message by page' })
  @Get('messages')
  async getMessages(@Query() payload: TokenAndNumberPageDTO):Promise<object>{
    return await this.mailService.messages(payload);
  }

  @ApiOperation({ summary: 'Remove message by id' })
  @Delete('messages')
  async deleteMessages(@Body() payload: TokenAndIdDTO):Promise<object>{
    return await this.mailService.removeMessages(payload);
  }
  
  @ApiOperation({ summary: 'Get token' })
  @Post('token')
  async getToken(@Body() payload: API_FormatCreateDTO): Promise<string> {
    return await this.mailService.getToken(payload);
  }
}