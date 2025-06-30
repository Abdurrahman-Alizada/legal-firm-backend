import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URI,
  database: process.env.DB_NAME || "law-firm", // 👈 cleaner
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "../modules/**/entities/*.entity.{ts,js}")],
});
