import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [TrackService, FavsService, AlbumService, ArtistService],
})
export class ArtistModule {}
