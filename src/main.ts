import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalPermissionGuard } from "./common/guards/global-permission.guard";
import { SwaggerModule } from "@nestjs/swagger";
import * as swaggerUi from "swagger-ui-express";
import { swaggerConfig, swaggerCustomOptions } from "./config/swagger.config";
import { AuditInterceptor } from "./modules/audit/interceptors/audit.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(document, swaggerCustomOptions)
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
