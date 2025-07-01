import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CompanyType } from "src/types";
export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CompanyType)
  type: CompanyType;

  @IsNotEmpty()
  ownerId: string; // stringified ObjectID
}
