export class TrackcCreateDTO {
  id: string;
  name: string;
  artistId: string;
  albumId: string | null;
  duration: number;
}
