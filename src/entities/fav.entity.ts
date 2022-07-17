import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumSchema } from './album-entity';
import { ArtistSchema } from './artist-entity';
import { TrackSchema } from './track-entity';

@Entity('favs')
export class FavSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { array: true })
  artists: String[];
  @Column('text', { array: true })
  albums: String[];
  @Column('text', { array: true })
  tracks: String[];
}
