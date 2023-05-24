import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {
  // @UseGuards(AuthGuard())
  // @Get('profile')
  // async getProfile(@Req() req: any) {
  //   return req.account;
  // }
}
