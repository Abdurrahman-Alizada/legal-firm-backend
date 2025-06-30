// src/cli/cli.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedPermissionsCommand } from "../../commands/seed-permission.command";
import { Permission } from "src/modules/permission/entities/permission.entity";
import { Role } from "src/modules/role/entities/role.entity";
import { typeOrmConfig } from "src/database/typeOrm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Permission, Role]),
  ],
  providers: [SeedPermissionsCommand],
})
export class CliModule {}
