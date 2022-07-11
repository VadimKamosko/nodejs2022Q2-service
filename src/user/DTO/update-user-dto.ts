import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'The required oldPassword field is missing' })
  oldPassword: string;
  @IsNotEmpty({ message: 'The required newPassword field is missing' })
  newPassword: string;
}
