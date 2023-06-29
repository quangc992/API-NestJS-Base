import { Inject, Injectable } from '@nestjs/common';
import { API_FormatCreateDTO, FormatCreateDTO, TokenAndIdDTO, TokenAndNumberPageDTO } from '../dto/index.dto';
import { CallApiMail } from '../callMailTm/callMailTm';

@Injectable()
export class MailService {
  constructor(
    private readonly callApiMail: CallApiMail
  ) { }

  public async create(payload: FormatCreateDTO): Promise<object> {
    const dataCreateAccount: API_FormatCreateDTO = {
      address: payload.address,
      password: payload.password,
    };
    return await this.callApiMail.createAccount(payload.auto, dataCreateAccount);
  }

  public async getToken(payload: API_FormatCreateDTO): Promise<string> {
    return await this.callApiMail.getTokenAccount(payload);
  }

  public async remove(payload: TokenAndIdDTO): Promise<object> {
    return await this.callApiMail.removeAccount(payload);
  }

  public async messages(payload: TokenAndNumberPageDTO): Promise<object> {
    return await this.callApiMail.getMessages(payload);
  }

  public async removeMessages(payload: TokenAndIdDTO): Promise<object> {
    return await this.callApiMail.removeMessages(payload);
  }
}
