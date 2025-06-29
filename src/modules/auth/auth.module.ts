import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Role } from "../role/entities/role.entity";
import { Permission } from "../permission/entities/permission.entity";
import { APP_GUARD } from "@nestjs/core";
import { GlobalPermissionGuard } from "src/common/guards/global-permission.guard";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Permission, Role])],
  controllers: [AuthController],
  providers: [AuthService, GlobalPermissionGuard],
})
export class AuthModule {}
