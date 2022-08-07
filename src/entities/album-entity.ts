import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistSchema } from './artist-entity';

@Entity('albums')
export class AlbumSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;

  @ManyToOne(() => ArtistSchema, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string;
}
