import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) { }
  
}
