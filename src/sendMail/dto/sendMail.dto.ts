import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty(
    {
      default: 'example@gmail.com',
      description: 'Email address of the recipient'
    }
  )
  @IsNotEmpty()
  @MinLength(5)
  @IsEmail()
  toMail: string;

  @ApiProperty({ default: 'Title gmail' })
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  subject: string;

  @ApiProperty({ default: 'Content sent to gmail !' })
  @IsNotEmpty()
  @MinLength(10)
  @IsString()
  content: string;
}
