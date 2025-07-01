import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("audit")
export class Audit {
  @ObjectIdColumn() _id: ObjectId;

  @Column() userId: string;
  @Column() action: string;
  @Column() method: string;
  @Column() endpoint: string;
  @Column() statusCode: number;

  @Column() ipAddress?: string;
  @Column() userAgent?: string;

  @Column({ nullable: true, type: "json" }) requestBody?: any;
  @Column({ nullable: true }) responseTime?: number;

  @CreateDateColumn() timestamp: Date;
}
