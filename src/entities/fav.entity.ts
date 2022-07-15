import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class FavSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  artists: String[];
  @Column()
  albums: String[];
  @Column()
  tracks: String[];
}
