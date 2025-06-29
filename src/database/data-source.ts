import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "mongodb",
  database:process.env.DB_NAME, 
  url: process.env.MONGODB_URI,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "../modules/**/entities/*.entity.{ts,js}")],
});
