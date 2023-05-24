import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AccountController } from './controllers/account.controller';
import { AuthController } from './controllers/auth.controller';
import { AccountService } from './service/account.service';
import { AuthService } from './service/auth.service';
import { AuthRepository } from './repository/auth.repository';
import { AccountRepository } from './repository/account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'ClientLogin',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      },
    }),
  ],
  controllers: [AuthController, AccountController],
  providers: [
    JwtStrategy,
    AuthService,
    AccountService,
    AuthRepository,
    AccountRepository,
    PrismaService,
  ],
})
export class AuthModule { }