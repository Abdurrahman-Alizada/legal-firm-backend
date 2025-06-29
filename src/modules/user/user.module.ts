import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Role } from "../role/entities/role.entity";
import { Permission } from "../permission/entities/permission.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]), // 👈 FIX
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
