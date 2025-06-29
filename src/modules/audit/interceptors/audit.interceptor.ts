import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, tap } from "rxjs";
import { Audit } from "src/modules/audit/entities/audit.entity";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepo: Repository<Audit>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("🎯 Interceptor Started");
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: async () => {
          console.log("🎯 Interceptor triggered");

          try {
            await this.auditRepo.save({
              userId: req.user?.id || "anonymous",
              method: req.method,
              endpoint: req.originalUrl,
              statusCode: res.statusCode,
              ipAddress: req.ip,
              userAgent: req.headers["user-agent"],
              requestBody: ["POST", "PUT", "PATCH"].includes(req.method)
                ? req.body
                : undefined,
              responseTime: Date.now() - now,
              action: `${req.method} ${req.baseUrl}${req.path}`,
            });

            console.log("✅ Audit log saved");
          } catch (error) {
            console.error("❌ Failed to save audit log:", error);
          }
        },
        error: (err) => {
          console.error("🚨 Request failed in interceptor:", err);
        },
      })
    );
  }
}
