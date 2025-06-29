import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Audit } from "./entities/audit.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepo: Repository<Audit>,
  ) {}

  async getLogs(query: {
    page?: number;
    limit?: number;
    userId?: string;
    method?: string;
    endpoint?: string;
    statusCode?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.userId) where.userId = query.userId;
    if (query.method) where.method = query.method.toUpperCase();
    if (query.endpoint) where.endpoint = query.endpoint;
    if (query.statusCode) where.statusCode = query.statusCode;

    const [data, total] = await this.auditRepo.findAndCount({
      where,
      order: { timestamp: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
