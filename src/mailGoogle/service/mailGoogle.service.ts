import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
// import * as Imap from 'imap';

import {template_1} from '../templateMail/template'
import { ReadMailDto, SendMailDto } from '../dto/index.dto';
dotenv.config({ path: '.env.gmail' });

@Injectable()
export class MailGoogleService {
  private readonly nodemailerTransporter: nodemailer.Transporter
  // private readonly imapConfig: Imap.Config

  constructor() {
    this.nodemailerTransporter = nodemailer.createTransport({
      host: process.env.HOST_SERVER,
      port: parseInt(process.env.PORT_SERVER),
      secure: true,
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL,
      },
    });

    // this.imapConfig = {
    //   user: process.env.USER_GMAIL,
    //   password: process.env.PASS_GMAIL,
    //   host: 'imap.gmail.com',
    //   port: 993,
    //   tls: true,
    //   authTimeout: 3000,
    //   tlsOptions: { rejectUnauthorized: false }
    // };
  }

  public async sendMail(sendMailDto: SendMailDto): Promise<object> {
    try {
      const contentSend = await template_1(sendMailDto.content);
      const mail = await this.nodemailerTransporter.sendMail({
        to: sendMailDto.toMail,
        subject: sendMailDto.subject,
        text: sendMailDto.content,
        html: contentSend,
      });
      return {
        status: HttpStatus.OK,
        messageId: mail.messageId,
        message: 'Email sent successfully'
      }
    } catch (error) {
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // public async checkReplyByMessageId(sendMailDto: ReadMailDto): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const connection = new Imap(this.imapConfig);
      
  //     connection.connect();
  
  //     connection.once('ready', () => {
  //       connection.openBox('INBOX', (err, mailbox) => {
  //         if (err) {
  //           console.error(err);
  //           reject(new Error('Failed to open mailbox'));
  //           return;
  //         }
  
  //         const searchCriteria = [
  //           ['HEADER', 'In-Reply-To', '<85594d17-b7b5-ce5b-b394-761ebb93bd11@localhost>']
  //         ];
  //         const fetchOptions: Imap.FetchOptions = {
  //           bodies: ['HEADER']
  //         };
  
  //         connection.search(searchCriteria, fetchOptions, (err, messages) => {
  //           if (err) {
  //             console.error(err);
  //             reject(new Error('Failed to search for emails'));
  //             return;
  //           }
  
  //           // Xử lý các email phản hồi tại đây
  //           const replyEmails = messages.map((message) => {
  //             if (message.parts && message.parts.length > 0) {
  //               console.log('Reply email:', message.parts[0].body);
  //               return message.parts[0].body;
  //             }
  //             return null;
  //           });
  
  //           connection.end();
  //           console.log('Finally block');
  
  //           resolve({
  //             messages: replyEmails
  //           });
  //         });
  //       });
  //     });
  
  //     connection.once('error', (err) => {
  //       console.error(err);
  //       reject(new Error('Failed to connect to IMAP server'));
  //     });
  //   });
  // }
  

}
