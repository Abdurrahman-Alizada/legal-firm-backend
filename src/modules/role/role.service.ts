import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { MongoRepository } from "typeorm";
import { AllRoleDto } from "./dto/all-role.dto";
import { ApiResponse } from "src/types";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: MongoRepository<Role>
  ) {}

  async findInviteRoles(): Promise<ApiResponse<any[]>> {
    const roles = await this.roleRepo
      .createCursor({
        isInviteable: true,
      })
      .project({ name: 1, _id: 1 })
      .toArray();

    return { data: roles, message: "Invitation Roles retrieved Successfully" };
  }
  async findSignupRoles(): Promise<ApiResponse<any[]>> {
    let roles = await this.roleRepo
      .createCursor({
        isSignUpAllowed: true,
      })
      .project({ name: 1, _id: 1 })
      .toArray();

    return { data: roles, message: "Signup Roles retrieved Successfully" };
  }
}
