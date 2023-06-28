import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { SendMailDto } from '../dto/index.dto';

dotenv.config({ path: '.env.gmail' });

@Injectable()
export class SendMailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST_SERVER,
      port: process.env.PORT_SERVER,
      secure: true,
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL,
      },
    });
  }

  async sendEmail(sendMailDto: SendMailDto): Promise<object> {
    try {
      const a = await this.transporter.sendMail({
        to: sendMailDto.toMail,
        subject: sendMailDto.subject,
        text: sendMailDto.content,
        html: `<p>${sendMailDto.content}</p>`,
      });
      console.log(a)
      return {
        status: 200,
        message: 'Email sent successfully !'
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }
}