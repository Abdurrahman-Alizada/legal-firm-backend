import { Controller, ForbiddenException, Get } from "@nestjs/common";
import { RoleService } from "./role.service";
import { AllRoleDto } from "./dto/all-role.dto";

import { Public } from "src/common/decorators/public.decorator";
import { ApiResponse } from "src/types";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Get("/registerable")
  async getSignupRoles(): Promise<ApiResponse<AllRoleDto[]>> {
    return this.roleService.findSignupRoles();
  }

  @Public()
  @Get("/inviteable")
  async getInviteRoles(): Promise<ApiResponse<AllRoleDto[]>> {
    return this.roleService.findInviteRoles();
  }
}
