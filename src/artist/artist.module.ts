import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { UserSchema } from 'src/entities/user.entity';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [ArtistController],
  providers: [TrackService, FavsService, AlbumService, ArtistService],
})
export class ArtistModule {}
