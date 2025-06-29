import { ObjectId } from "mongodb";
import { ActionType, HttpMethod } from "src/types";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("permissions")
export class Permission {
  @ObjectIdColumn() id: ObjectId;

  @Column() name: string; // "Create Driver"
  @Column() code: string; // "drivers:create"
  @Column() description: string;

  @Column() resource: string; // "drivers"
  @Column() action: ActionType;

  @Column() method: HttpMethod; // HTTP method
  @Column() endpoint: string; // e.g. "/api/drivers", or pattern "/api/drivers/:id"

  @CreateDateColumn() createdAt: Date;
}
