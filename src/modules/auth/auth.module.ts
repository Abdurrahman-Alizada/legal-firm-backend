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
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/common/strategies/jwt.strategy";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    UserModule,
    TypeOrmModule.forFeature([Permission, Role]),
  ],
  providers: [AuthService, GlobalPermissionGuard, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
