import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistSchema } from 'src/entities/artist-entity';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistSchema])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
