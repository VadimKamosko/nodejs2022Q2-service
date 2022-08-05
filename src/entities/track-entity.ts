import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumSchema } from './album-entity';
import { ArtistSchema } from './artist-entity';

@Entity('tracks')
export class TrackSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @ManyToOne(() => ArtistSchema, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => AlbumSchema, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  album: string;

  @Column({ nullable: true })
  albumId: string;
  @Column()
  duration: number;
}
