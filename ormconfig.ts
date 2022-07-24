import { DataSource } from 'typeorm';
import 'dotenv/config';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  port: +process.env.TYPEORM_PORT,
  entities: [__dirname + process.env.TYPEORM_ENTITIES],
  database: process.env.TYPEORM_DATABASE,

  migrationsTableName: 'migrations',
  migrations: [__dirname + process.env.TYPEORM_MIGRATIONS],
  migrationsRun: false,
  // autoLoadEntities: true,
  synchronize: true,
  logging: true,
});

datasource.initialize();

export default datasource;
