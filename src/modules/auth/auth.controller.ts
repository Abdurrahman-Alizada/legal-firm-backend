import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorators/public.decorator";
import { RegisterDto } from "./dto/register.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { InviteUserDto } from "./dto/invite-user.dto";
import { AcceptInviteDto } from "./dto/accept-invite.dto";
import { User } from "src/common/decorators/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: "Register a new user (Client or Lawyer)" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 400, description: "Invalid input or not allowed" })
  @ApiBody({ type: RegisterDto })
  @Post("register")
  register(@Body() registerDTO: RegisterDto) {
    return this.authService.register(registerDTO);
  }

  @Public()
  @ApiOperation({ summary: "Login to an account" })
  @ApiResponse({ status: 201, description: "User Loggedin successfully" })
  @ApiResponse({ status: 400, description: "Invalid input or not allowed" })
  @ApiBody({ type: LoginDto })
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "forgot password" })
  @ApiBody({ type: ForgotPasswordDto })
  @Public()
  @Post("forgot-password")
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @ApiOperation({ summary: "reset password" })
  @ApiBody({ type: ResetPasswordDto })
  @Public()
  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @ApiOperation({ summary: "Invite user to company" })
  @ApiBody({ type: InviteUserDto })
  @Post("invite-user")
  invite(@Body() dto: InviteUserDto, @User() user) {
    return this.authService.inviteUser(dto, user);
  }

  @ApiOperation({ summary: "accpet invite user" })
  @ApiBody({ type: AcceptInviteDto })
  @Post("accept-invite")
  acceptInvite(@Body() dto: AcceptInviteDto) {
    return this.authService.acceptInvite(dto);
  }
}
