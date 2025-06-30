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
import { CliModule } from "./modules/cli/cli.module";
import { DataSource } from "typeorm";
import { JwtAuthGuard } from "./common/guards/jwt.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ no need to import in every module
      envFilePath: ".env", // optional if your file is named `.env`
    }),
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
    {
      provide: APP_GUARD,
      useClass: GlobalPermissionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log("✅ TypeORM Initialized?", this.dataSource.isInitialized);
  }
}
