import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./database/typeOrm.config";
import { SeedPermissionsCommand } from "./commands/seed-permission.command";
import { Permission } from "./modules/permission/entities/permission.entity";
import { Role } from "./modules/role/entities/role.entity";
import { GlobalPermissionGuard } from "./common/guards/global-permission.guard";
import { AuditInterceptor } from "./modules/audit/interceptors/audit.interceptor";
import { AuditModule } from "./modules/audit/audit.module";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { Audit } from "./modules/audit/entities/audit.entity";
import { User } from "./modules/user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Permission, Role, Audit, User]),
    AuthModule,
    AuditModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [
    SeedPermissionsCommand,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: GlobalPermissionGuard,
    // },
  ],
  exports: [],
})
export class AppModule {}
