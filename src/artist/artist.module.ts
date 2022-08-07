import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistSchema } from 'src/entities/artist-entity';
import { TrackSchema } from 'src/entities/track-entity';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistSchema, TrackSchema])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
