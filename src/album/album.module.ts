import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumSchema } from 'src/entities/album-entity';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumSchema])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
