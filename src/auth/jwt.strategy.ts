import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authRepository: AuthRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any): Promise<any> {
    const token = req.headers['authorization'].split(" ")[1];
    const LoginName = payload.LoginName;
    const ClientLogin = await this.authRepository.getSingleAuthByLoginName({ LoginName });

    if (token !== ClientLogin['AccessToken']) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    return ClientLogin;
  }
}
