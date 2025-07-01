// common/guards/jwt.guard.ts
import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { RouteType } from "src/types";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      RouteType.IS_PUBLIC,
      [context.getHandler(), context.getClass()]
    );

    const req = context.switchToHttp().getRequest();
    console.log("🛡️ JwtAuthGuard: checking token for", req.url);

    if (isPublic) {
      console.log("🟢 JwtAuthGuard: public route, skipping auth");
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      console.log("❌ JwtAuthGuard: unauthorized access");
      return null; // will trigger 401
    }
    console.log("✅ JwtAuthGuard: user authenticated:", user);
    return user;
  }
}
