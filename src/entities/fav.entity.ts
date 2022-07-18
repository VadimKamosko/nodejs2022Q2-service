import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumSchema } from './album-entity';
import { ArtistSchema } from './artist-entity';
import { TrackSchema } from './track-entity';

@Entity('favs')
export class FavSchema {
  @PrimaryColumn()
  idUser: string;

  @ManyToMany((type) => ArtistSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_use_art',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'art_id', referencedColumnName: 'id' },
  })
  artists: ArtistSchema[];

  @ManyToMany((type) => AlbumSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_use_alb',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'alb_id', referencedColumnName: 'id' },
  })
  albums: AlbumSchema[];

  @ManyToMany((type) => TrackSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_use_track',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'track_id', referencedColumnName: 'id' },
  })
  tracks: TrackSchema[];
}
