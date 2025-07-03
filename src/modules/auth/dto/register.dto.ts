import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "src/modules/role/entities/role.entity";
import {
  JoinColumn,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
  OneToOne,
} from "typeorm";

export class RegisterDto {

  @ApiHideProperty()
  @ObjectIdColumn()
  _id: string;

  @ApiProperty({ example: "John Doe" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "JohnDoe@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "JohnDoePassword" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "123123-1234234-123123-123", type: String })
  @ObjectIdColumn()
  roleId: ObjectId;

  @ApiHideProperty()
  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  role: Role;
}
