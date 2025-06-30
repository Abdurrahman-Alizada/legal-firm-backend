// common/guards/jwt.guard.ts
import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log("🛡️ JwtAuthGuard: checking token for", req.url);

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
