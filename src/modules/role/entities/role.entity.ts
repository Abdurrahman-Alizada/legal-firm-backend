import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("roles")
export class Role {
  @ObjectIdColumn() _id: ObjectId;

  @Column() name: string; // e.g., "Admin", "Fleet Manager"
  @Column() description: string;
  @Column() isSignUpAllowed: boolean;
  @Column() isInviteable: boolean;

  @Column("array") permissionIds: ObjectId[]; // ObjectIDs of Permission

  @CreateDateColumn() createdAt: Date;
}
