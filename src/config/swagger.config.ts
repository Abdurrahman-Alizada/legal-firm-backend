// src/config/swagger.config.ts

import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Law Firm apis")
  .setDescription("API documentation for admin panel")
  .setVersion("1.0")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header",
      name: "Authorization",
    },
    "access-token"
  )
  .build();

const theme = new SwaggerTheme();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  customSiteTitle: "Law Firm apis",
};
