const request = require("request");
import axios from 'axios';

import { DOMAIN, API } from './constant';
import { keyStringRandomAddUnix } from '../util/reg';
import { API_FormatCreateDTO, TokenAndIdDTO, TokenAndNumberPageDTO } from '../dto/index.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CallApiMail {
  constructor() { }

  public async createAccount(isAutoReg: boolean, accountInput?: API_FormatCreateDTO): Promise<object> {
    try {
      if (isAutoReg === true) {
        const randomValue = keyStringRandomAddUnix(3);
        accountInput.address = randomValue + DOMAIN.DOMAIN_GMAIL;
        accountInput.password = randomValue;
      } else {
        accountInput.address = accountInput.address + DOMAIN.DOMAIN_GMAIL;
      }

      const urlApi = DOMAIN.DOMAIN_API + API.CREATE_ACCOUNT;
      const response = await axios.post(urlApi, accountInput);
      const { id, address, isDisabled, isDeleted, createdAt } = response.data;
      const tokenAccount = await this.getTokenAccount({ address, password: accountInput.password })
      return {
        id, address,
        password: accountInput.password,
        token: tokenAccount,
        isDisabled, isDeleted, createdAt,
      };
    } catch (error) {
      if (error.code = 'ERR_BAD_REQUEST') {
        throw new HttpException(error.response.data['hydra:description'] || error.response.data.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getTokenAccount(accountInput: API_FormatCreateDTO): Promise<string> {
    try {
      const urlApi = DOMAIN.DOMAIN_API + API.TOKEN_ACCOUNT;
      const response = await axios.post(urlApi, accountInput);
      return response.data.token
    } catch (error) {
      if (error.code = 'ERR_BAD_REQUEST') {
        throw new HttpException(error.response.data['hydra:description'] || error.response.data.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async removeAccount({ token, id }: TokenAndIdDTO): Promise<object> {
    try {
      const urlApi = DOMAIN.DOMAIN_API + API.OPTION_ACCOUNT + id;
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.delete(urlApi, { headers });
      return { status: 200 };
    } catch (error) {
      if (error.code = 'ERR_BAD_REQUEST') {
        throw new HttpException(error.response.data['hydra:description'] || error.response.data.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getMessages({ token, page }: TokenAndNumberPageDTO): Promise<object> {
    try {
      const urlApi = DOMAIN.DOMAIN_API + API.MESSAGES + page;
      const headers = {
        'Authorization': DOMAIN.BEARER + token,
        'accept': 'application/json'
      };
      const response = await axios.get(urlApi, { headers });
      const messages = Object.values(response.data).map((
        { id, from, to, subject, intro, hasAttachments, size, createdAt }) => {
        return { id, from, to, subject, intro, hasAttachments, size, createdAt };
      });

      return {
        count: messages.length,
        messages
      };
    } catch (error) {
      if (error.code = 'ERR_BAD_REQUEST') {
        throw new HttpException(error.response.data['hydra:description'] || error.response.data.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async removeMessages({ token, id }: TokenAndIdDTO): Promise<object> {
    try {
      const urlApi = DOMAIN.DOMAIN_API + API.OPTION_MESSAGES + id;
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.delete(urlApi, { headers });
      return { status: 200 };
    } catch (error) {
      if (error.code = 'ERR_BAD_REQUEST') {
        throw new HttpException(error.response.data['hydra:description'] || error.response.data.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}