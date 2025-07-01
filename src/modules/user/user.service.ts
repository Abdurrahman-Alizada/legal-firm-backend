import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "../role/entities/role.entity";
import { Permission } from "../permission/entities/permission.entity";
import { ObjectId } from "mongodb";
import { Company } from "../company/entities/company.entity";
import { CompanyType } from "src/types";

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

  //   async handleUserSignup(dto: CreateUserDto): Promise<User> {
  //   const user = new User();
  //   user.email = dto.email;
  //   user.roleId = dto.role;
  //   user.name = dto.name;
  //   user.isFirmOwner = true;

  //   const savedUser = await this.userRepo.save(user);

  //   const firm = new Company();
  //   firm.name = `${user.name}'s Firm`;
  //   firm.ownerId = savedUser.id;
  //   firm.memberIds = [savedUser.id];
  //   firm.type = user.roleId && CompanyType.LAW;

  //   const savedFirm = await this.firmRepo.save(firm);

  //   // Update user with firmId
  //   savedUser.firmId = savedFirm.id;
  //   await this.userRepo.save(savedUser);

  //   return savedUser;
  // }

  // async inviteSubUser(inviter: User, dto: CreateUserDto) {
  //   if (!inviter.isFirmOwner || inviter.role !== Role.LAWYER) {
  //     throw new ForbiddenException("Only lawyers can invite sub-users.");
  //   }

  //   const subUser = new User();
  //   subUser.name = dto.name;
  //   subUser.email = dto.email;
  //   subUser.role = dto.role;
  //   subUser.firmId = inviter.firmId;
  //   subUser.isFirmOwner = false;

  //   const saved = await this.userRepo.save(subUser);

  //   // update firm members
  //   await this.firmRepo.update(inviter.firmId, {
  //     $push: { memberIds: saved.id },
  //   });

  //   return saved;
  // }
}
