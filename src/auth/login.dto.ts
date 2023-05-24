import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @ApiProperty()
    @IsNotEmpty()
    loginName: string;

    @ApiProperty()
    @IsString()
    password: string;
}