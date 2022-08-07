import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'The required login field is missing' })
  login: string;
  @IsNotEmpty({ message: 'The required password field is missing' })
  password: string;
}
