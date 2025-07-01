import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class AllRoleDto {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;
}
