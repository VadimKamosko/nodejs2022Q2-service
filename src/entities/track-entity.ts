import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class trackSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  artistId: string | null;
  @Column()
  albumId: string | null;
  @Column()
  duration: number;
}
