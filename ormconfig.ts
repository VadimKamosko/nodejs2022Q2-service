import { DataSource } from 'typeorm';
import 'dotenv/config';
import { ArtistSchema } from './src/entities/artist-entity';
import { TrackSchema } from './src/entities/track-entity';
import { FavSchema } from './src/entities/fav.entity';
import { AlbumSchema } from './src/entities/album-entity';
import { UserSchema } from './src/entities/user.entity';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: [ArtistSchema, ArtistSchema, TrackSchema, FavSchema, AlbumSchema,UserSchema],
  database: process.env.TYPEORM_DATABASE,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  synchronize: false,
  logging: true,
  migrationsRun:true
});

export default datasource;
