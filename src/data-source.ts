import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const db = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: ['build/entity/*.js'],
  logging: false,
  synchronize: true,
});

export default db;
