import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class InviteSubUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  roleId: string;
}
