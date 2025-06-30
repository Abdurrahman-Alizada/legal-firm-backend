import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "../role/entities/role.entity";
import { Permission } from "../permission/entities/permission.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>
  ) {}

  async getUserRoleWithPermissions(roleId: string) {
    const role = await this.roleRepo.findOne({
      where: { _id: new ObjectId(roleId) },
    });

    if (!role) throw new Error("Role not found");

    const permissions = await this.permissionRepo.findByIds(role.permissionIds);

    return {
      ...role,
      permissions,
    };
  }
}
