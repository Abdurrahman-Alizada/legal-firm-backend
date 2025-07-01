import { DataSource } from "typeorm";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config();


export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URI,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "../modules/**/entities/*.entity.{ts,js}")],
});
