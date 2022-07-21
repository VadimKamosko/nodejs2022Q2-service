import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/user/DTO/create-user-dto';
import { AuthService } from './auth.service';
import { Tokens } from './DTO/token-dto';
import { Request } from 'express';

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

  @UseGuards(AuthGuard('JWT-refresh'))
  @Post('/refresh')
  refToken(@Req() req: Request) {
    const user = req.user['sub'];
    return this.authService.refreshToken(user, req.user['rt']);
  }
}
