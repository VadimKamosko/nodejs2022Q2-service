import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MyLogger } from './utils/logger.middleware';
import { RtStrategies } from './strategies/rt.strat';
import { AtStrategies } from './strategies/at.strat';

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
        type: config.get<'aurora-postgres'>('TYPE_DB'),
        host: config.get<'string'>('HOST_DB'),
        username: config.get<'string'>('USERNAME_DB'),
        password: config.get<'string'>('PASSWORD_DB'),
        port: config.get<'number'>('PORT_DB'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        database: config.get<'string'>('DATABASE_NAME_DB'),
        autoLoadEntities: true,
        synchronize: true,
        // logging: true,
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AtStrategies, RtStrategies],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MyLogger)
      .forRoutes(
        { path: 'user', method: RequestMethod.ALL },
        { path: 'track', method: RequestMethod.ALL },
        { path: '/favs/*', method: RequestMethod.ALL },
        { path: 'album', method: RequestMethod.ALL },
        { path: 'artist', method: RequestMethod.ALL },
        { path: '/auth/*', method: RequestMethod.ALL },
      );
  }
}
