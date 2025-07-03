import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "user@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Test@123" })
  @IsString()
  password: string;
}
