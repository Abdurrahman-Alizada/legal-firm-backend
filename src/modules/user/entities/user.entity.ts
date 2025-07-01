import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn() _id: ObjectId;

  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() roleId: string; // references Role

  @Column({ nullable: true })
  firmId?: ObjectId;

  @Column({ default: false })
  isFirmOwner: boolean;

  @CreateDateColumn() createdAt: Date;
}
