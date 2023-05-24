import { ApiProperty } from '@nestjs/swagger';
import { MinLength, Matches, IsEmail, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ default: 'string' })
  @Matches(/^\S*$/, { message: 'No whitespace allowed in the name' })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  LoginName: string;

  @ApiProperty({ default: 'string@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  Email: string;

  @ApiProperty({ default: 'FirstName' })
  @MinLength(5)
  @MaxLength(10)
  FirstName: string;

  @ApiProperty({ default: 'LastName' })
  @MinLength(5)
  @MaxLength(10)
  LastName: string;

  @ApiProperty({ default: '' })
  @MaxLength(255)
  Description: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  Password: string;
}
