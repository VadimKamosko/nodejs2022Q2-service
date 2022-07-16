import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
