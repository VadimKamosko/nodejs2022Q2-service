import { Album } from 'src/album/DTO/album';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { CreateFav } from 'src/favs/DTO/createFav';
import { Track } from 'src/track/DTO/Track';
import { FullUserDto } from 'src/user/DTO/full-user.dto';

export const users: FullUserDto[] = [];
export const artists: Artist[] = [];
export const track: Track[] = [];
export const albums: Album[] = [];
export const favs: CreateFav = {
  artists: [],
  albums: [],
  tracks: [],
};
