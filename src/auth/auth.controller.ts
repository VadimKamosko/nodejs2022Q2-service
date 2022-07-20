import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/DTO/create-user-dto';
import { AuthService } from './auth.service';
import { Tokens } from './DTO/token-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  sihnup(@Param() body: CreateUserDTO): Promise<Tokens> {
    return this.authService.signup(body);
  }

  @Post('/login')
  login(@Param() body: CreateUserDTO): Promise<Tokens> {
    return this.authService.login(body);
  }

  @Post('/refresh')
  refToken(@Body('refreshToken') token: string) {
    this.authService.refreshToken(token);
  }
}
