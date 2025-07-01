import { CompanyType } from "src/types";
import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Company {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ enum: CompanyType })
  type: CompanyType; // differentiate use case

  @ObjectIdColumn()
  ownerId: ObjectId;

  @Column("simple-array")
  memberIds: ObjectId[]; // user IDs belonging to this firm

  @Column({ default: new Date() })
  createdAt: Date;
}
