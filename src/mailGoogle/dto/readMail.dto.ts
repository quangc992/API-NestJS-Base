import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ReadMailDto {
  @ApiProperty(
    {
      default: false,
      description: "Default will show unread mails, if you want to see all set it to 'true'",
      required: false,
    }
  )
  @IsOptional()
  responseMail: boolean;
}
