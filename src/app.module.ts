import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-postgres'>('TYPEORM_CONNECTION'),
        host: config.get<'string'>('TYPEORM_HOST'),
        username: config.get<'string'>('TYPEORM_USERNAME'),
        password: config.get<'string'>('TYPEORM_PASSWORD'),
        port: config.get<'number'>('TYPEORM_PORT'),
        entities: [__dirname + config.get<'string'>('TYPEORM_ENTITIES')],
        database: config.get<'string'>('TYPEORM_DATABASE'),

        migrations: [__dirname + config.get<'string'>('TYPEORM_MIGRATIONS')],
        migrationsRun: config.get('TYPEORM_MIGRATIONS_RUN'),
        autoLoadEntities: true,
        synchronize: config.get('TYPEORM_SYNCHRONIZE'),
        logging: config.get('TYPEORM_LOGGING'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
