import { IsNotEmpty } from 'class-validator';

export class UpdateTrackDTO {
  @IsNotEmpty({ message: 'The required name field is missing' })
  name: string;
  @IsNotEmpty({ message: 'The required artistId field is missing' })
  artistId: string;
  albumId: string | null;
  @IsNotEmpty({ message: 'The required duration field is missing' })
  duration: number;
}
