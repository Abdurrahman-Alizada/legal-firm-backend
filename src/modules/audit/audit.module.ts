// src/modules/audit/audit.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { Audit } from "./entities/audit.entity";
import { AuditInterceptor } from "./interceptors/audit.interceptor";
import { AuditService } from "./audit.service";
import { AuditController } from "./audit.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  controllers: [AuditController],
  providers: [AuditService, AuditInterceptor],
  exports: [TypeOrmModule]
})
export class AuditModule {}
