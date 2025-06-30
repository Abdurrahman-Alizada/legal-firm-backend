import { SetMetadata } from "@nestjs/common";
import { RouteType } from "src/types";

export const Public = () => SetMetadata(RouteType.IS_PUBLIC, true);
