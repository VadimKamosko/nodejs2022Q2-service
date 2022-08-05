import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { configAsync } from 'typeconfig';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(configAsync),
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
        { path: 'user/*', method: RequestMethod.ALL },
        { path: 'track/*', method: RequestMethod.ALL },
        { path: '/favs/*', method: RequestMethod.ALL },
        { path: 'album/*', method: RequestMethod.ALL },
        { path: 'artist/*', method: RequestMethod.ALL },
        { path: '/auth/*', method: RequestMethod.ALL },
        { path: '/', method: RequestMethod.ALL },
      );
  }
}
