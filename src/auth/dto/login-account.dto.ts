import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class LoginAccountDto {
  @ApiProperty({ default: 'string' })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  LoginName: string;

  @ApiProperty({default: 'string'})
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  Password: string;
}
