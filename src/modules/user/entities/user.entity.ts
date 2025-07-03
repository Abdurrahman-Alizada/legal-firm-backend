import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn() _id: ObjectId;

  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() roleId: ObjectId; // references Role

  @Column({ default: false }) isPending: boolean; // references Role

  @Column({ nullable: true })
  companyId: ObjectId;

  @Column({ default: false })
  isCompanyOwner: boolean;

  @CreateDateColumn() createdAt: Date;
}
