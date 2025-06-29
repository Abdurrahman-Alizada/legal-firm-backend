import { Controller, Get, Query } from "@nestjs/common";
import { AuditService } from "./audit.service";

@Controller("admin/audit")
export class AuditController {
  constructor(private readonly auditLogService: AuditService) {}

  @Get()
  async listAuditLogs(@Query() query: any) {
    return await this.auditLogService.getLogs(query);
  }
}
