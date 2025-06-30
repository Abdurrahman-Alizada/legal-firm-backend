import { NestFactory } from "@nestjs/core";
import { CommandFactory } from "nest-commander";
import { SwaggerModule } from "@nestjs/swagger";
import * as swaggerUi from "swagger-ui-express";
import { swaggerConfig, swaggerCustomOptions } from "./config/swagger.config";
import { AppModule } from "./app.module";

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
