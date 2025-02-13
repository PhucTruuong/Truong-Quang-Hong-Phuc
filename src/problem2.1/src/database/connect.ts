import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { AircraftEntity } from "../entities/aircraft.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    AircraftEntity,
  ],
  synchronize: false,
  logging: true,
});

console.log("PostgresSQL Connection: ", AppDataSource.options);

AppDataSource.initialize()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));
