// dto/forgot-password.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({ example: "user@email.com" })
  @IsEmail()
  email: string;
}
