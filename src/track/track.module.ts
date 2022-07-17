import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackSchema } from 'src/entities/track-entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackSchema])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
