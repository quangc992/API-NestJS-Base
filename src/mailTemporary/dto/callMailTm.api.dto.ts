import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class API_FormatCreateDTO {
  @ApiProperty({ default: 'example' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  address: string;

  @ApiProperty({ default: 'pass-example' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}

export class FormatCreateDTO {
  @ApiProperty(
    {
      default: true,
      description: "By default, the auto field will be true, if you want to edit the account password, change it to false",
      required: true,
    }
  )
  @IsNotEmpty()
  auto: boolean;

  @ApiProperty({ default: 'example' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  address: string;

  @ApiProperty({ default: 'pass-example' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  password: string;
}

export class TokenAndIdDTO {
  @ApiProperty({ default: 'string' })
  @IsString()
  @MinLength(10)
  token: string;


  @ApiProperty({ default: 'string' })
  @IsString()
  @MinLength(10)
  id: string;
}

export class TokenAndNumberPageDTO {
  @ApiProperty({ default: '1' })
  @IsNotEmpty()
  page: string;

  @ApiProperty({ default: 'string' })
  @IsNotEmpty()
  @MinLength(10)
  token: string;
}