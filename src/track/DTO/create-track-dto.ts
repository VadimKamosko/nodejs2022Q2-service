import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackcCreateDTO {
  @IsNotEmpty({ message: 'The required name field is missing' })
  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNotEmpty({ message: 'The required duration field is missing' })
  @IsNumber()
  duration: number;
}
