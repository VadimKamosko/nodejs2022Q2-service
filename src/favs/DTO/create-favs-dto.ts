import { Album } from 'src/album/DTO/album';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { Track } from 'src/track/DTO/Track';

export class Fav {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
