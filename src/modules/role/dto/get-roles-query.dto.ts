import { IsOptional, IsBooleanString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetRolesQueryDto {
  @ApiPropertyOptional({
    description: "Filter roles by isSignUpAllowed flag (true/false)",
  })
  @IsOptional()
  @IsBooleanString()
  isSignUpAllowed?: boolean; // use string to allow "true"/"false" in query

  @ApiPropertyOptional({
    description: "Filter roles by isSignUpAllowed flag (true/false)",
  })
  @IsOptional()
  @IsBooleanString()
  isInviteable?: boolean; // use string to allow "true"/"false" in query
}
