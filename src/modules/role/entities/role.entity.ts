import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity('roles')
export class Role {
  @ObjectIdColumn() id: ObjectId;

  @Column() name: string;             // e.g., "Admin", "Fleet Manager"
  @Column() description: string;

  @Column('array') permissionIds: string[]; // ObjectIDs of Permission

  @CreateDateColumn() createdAt: Date;
}
