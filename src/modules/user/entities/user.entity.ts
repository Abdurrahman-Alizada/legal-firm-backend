import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn() id: ObjectId;

  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() roleId: string; // references Role

  @CreateDateColumn() createdAt: Date;
}
