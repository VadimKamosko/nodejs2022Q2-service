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
import datasource from 'ormconfig';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavsModule,
    TrackModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...datasource.options, autoLoadEntities: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
