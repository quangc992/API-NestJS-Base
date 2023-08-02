import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import * as bcrypt from 'bcrypt';

import { AccountRepository } from '../repository/account.repository';
import { CreateAccountDto, LoginAccountDto, UpdateAccountDto, refreshTokenDto } from '../dto/index.dto';
import { AccountEncodePass, AccountRole, AccountValidationStatus } from '../enum/account.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
  ) { }


  public async register(createAccount: CreateAccountDto): Promise<object> {
    try {
      const saltNumber = await this._randomSalt();
      const PasswordHash = await bcrypt.hash(createAccount.Password, saltNumber)

      const _createClientAccount = {
        LastName: createAccount.LastName,
        FirstName: createAccount.FirstName,
        Description: createAccount.Description,
        LoginName: createAccount.LoginName,
        RoleId: AccountRole.USER,
      };
      const account = await this.accountRepository.createAccount(_createClientAccount)
      // bug
      const _createClientLogin = {
        AccountId: account['AccountId'],
        LoginName: account['LoginName'],
        PasswordHash: PasswordHash,
        PasswordSalt: saltNumber,
        EmailAddress: createAccount.Email,
        HashAlgorithmId: AccountEncodePass.BCRYPT,
        EmailValidationStatusId: AccountValidationStatus.DEFAULT,
      }
      const clientLogin = await this.authRepository.createAuth(_createClientLogin)
      const resultToken = await this._createToken({
        LoginName: clientLogin.LoginName,
        AccountId: clientLogin.AccountId
      }, true)
      return resultToken

    } catch (error) {
      if ((error.code = 11000)) {
        throw new HttpException('Duplicate Key Error', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'error Unknown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(loginAccountDto: LoginAccountDto): Promise<object> {
    try {
      const account = await this.authRepository.getSingleAuthByLoginName({ LoginName: loginAccountDto.LoginName })
      if (!account) return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      const isCheckAccount = await bcrypt.compare(loginAccountDto.Password, account.PasswordHash);
      if (!isCheckAccount) return new HttpException('Account Unauthorized', HttpStatus.UNAUTHORIZED);
      const token = await this._createToken({
        LoginName: account.LoginName,
        AccountId: account.AccountId,
      }, true)
      return token;
    } catch (error) {
      console.log(error)
      throw new HttpException('Unknown Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async logout(ClientLogin: any): Promise<object> {
    try {
      await this.authRepository.updateAuth({
        where: { AccountId: ClientLogin.AccountId },
        data: {
          AccessToken: null,
          RefreshToken: null
        },
      });
      return {
        status: 200
      };
    } catch (error) {
      throw new HttpException('Unknown Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async refreshToken(refreshTokenDto: refreshTokenDto): Promise<object> {
    try {
      const payloadJwt = await this.jwtService.verify(refreshTokenDto.RefreshToken,
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
        });
      const account = await this.authRepository.getSingleAuthByLoginName({ LoginName: payloadJwt.LoginName })
      const token = await this._createToken({
        LoginName: account.LoginName,
        AccountId: account.AccountId,
      }, true)
      return token;
    } catch (error) {
      console.log(error)
      throw new HttpException('Unknown Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async _createToken(payload: object, isRefresh = false): Promise<object> {
    try {
      const accessToken = await this._createAccessToken(payload)
      if (isRefresh) {
        const refreshToken = await this._createRefreshToken(payload)
        return {
          accessToken: accessToken['accessToken'],
          accessTokenExpiresIn: accessToken['expiresIn_Token'],
          refreshToken: refreshToken['refreshToken'],
          refreshTokenExpiresIn: refreshToken['expiresIn_Token']
        }
      }
      return accessToken
    } catch (error) {
      throw new HttpException(
        'error Unknown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _createAccessToken(payload: any): Promise<object> {
    try {
      const privateKey_access = process.env.ACCESS_TOKEN_SECRET;
      const expiresIn_access = Number(process.env.ACCESS_TOKEN_EXPIRE);

      const accessToken = this.jwtService.sign({ LoginName: payload.LoginName }, {
        secret: privateKey_access,
        expiresIn: expiresIn_access,
      });
      await this.authRepository.updateAuth({
        where: { AccountId: payload.AccountId },
        data: { AccessToken: accessToken },
      });
      return {
        accessToken,
        expiresIn_Token: expiresIn_access
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'error Unknown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _createRefreshToken(payload: any): Promise<object> {
    try {
      const privateKey_refresh = process.env.REFRESH_TOKEN_SECRET;
      const expiresIn_refresh = Number(process.env.REFRESH_TOKEN_EXPIRE);
      const refreshToken = this.jwtService.sign({ LoginName: payload.LoginName }, {
        secret: privateKey_refresh,
        expiresIn: expiresIn_refresh,
      });

      await this.authRepository.updateAuth({
        where: { AccountId: payload.AccountId },
        data: { RefreshToken: refreshToken },
      });
      // check update duoc hay chua
      return {
        refreshToken,
        expiresIn_Token: expiresIn_refresh
      }
    } catch (error) {
      throw new HttpException(
        'error Unknown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _randomSalt(): Promise<number> {
    var salt = Math.floor(Math.random() * 3) + 8;
    return salt;
  }
}