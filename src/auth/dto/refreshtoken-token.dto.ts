import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class refreshTokenDto {
  @ApiProperty({default: 'token'})
  @IsNotEmpty()
  RefreshToken: string;

}
