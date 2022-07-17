import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumSchema } from 'src/entities/album-entity';
import { ArtistSchema } from 'src/entities/artist-entity';
import { FavSchema } from 'src/entities/fav.entity';
import { TrackSchema } from 'src/entities/track-entity';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavSchema,
      TrackSchema,
      ArtistSchema,
      AlbumSchema,
    ]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
