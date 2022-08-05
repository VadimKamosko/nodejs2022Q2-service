import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { AlbumSchema } from './album-entity';
import { ArtistSchema } from './artist-entity';
import { TrackSchema } from './track-entity';

@Entity('favs')
export class FavSchema {
  @PrimaryColumn()
  idUser: string;

  @ManyToMany(() => ArtistSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_use_art',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'art_id', referencedColumnName: 'id' },
  })
  artists: ArtistSchema[];

  @ManyToMany(() => AlbumSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fav_use_alb',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'alb_id', referencedColumnName: 'id' },
  })
  albums: AlbumSchema[];

  @ManyToMany(() => TrackSchema, {
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
