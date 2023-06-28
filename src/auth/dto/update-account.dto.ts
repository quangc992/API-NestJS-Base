import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccountDto {
  // @ApiProperty({ default: 'string@Mail.com' })
  // @IsEmail()
  // @IsNotEmpty()
  // @MinLength(4)
  // @MaxLength(25)
  // Email: string;

  // @ApiProperty({default: 'string'})
  // @IsNotEmpty()
  // @MinLength(6)
  // @MaxLength(20)
  // @IsString()
  // Password: string;
}
