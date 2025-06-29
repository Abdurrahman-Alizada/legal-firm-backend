import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { match } from "path-to-regexp";
import { Permission } from "src/modules/permission/entities/permission.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { UserService } from "src/modules/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class GlobalPermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("Guarding");
    if (!user?.roleId) return false;

    const method = request.method;
    const actualPath = request.route?.path;

    const role = await this.roleRepo.findOne({ where: { id: user.roleId } });
    const allPermissions = await this.permissionRepo.findByIds(
      role?.permissionIds!
    );

    for (const perm of allPermissions) {
      const matcher = match(perm.endpoint, { decode: decodeURIComponent });
      const isMatch = matcher(actualPath);
      if (isMatch && perm.method === method) return true;
    }

    return false;
  }
}
