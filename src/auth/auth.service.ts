import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/user/DTO/create-user-dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tokens } from './DTO/token-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
    private JwtService: JwtService,
  ) {}

  async login(AuthUser: CreateUserDTO): Promise<Tokens> {
    const user = await this.usersRepository.findOneBy({
      login: AuthUser.login,
    });

    if (!user) throw new ForbiddenException('Access denied');

    if (bcrypt.compare(AuthUser.password, user.password))
      throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, AuthUser.login);

    await this.updateRtToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signup(AuthUser: CreateUserDTO): Promise<Tokens> {
    AuthUser.password = await this.hashData(AuthUser.password);

    const newUser = await this.usersRepository.insert(AuthUser);

    const tokens = await this.getTokens(
      newUser.identifiers[0].id,
      AuthUser.login,
    );

    await this.updateRtToken(newUser.identifiers[0].id, tokens.refresh_token);
    return tokens;
  }

  refreshToken(token: string) {}

  async updateRtToken(userId: string, rt: string) {
    const hash = await this.hashData(rt);

    await this.usersRepository
      .createQueryBuilder()
      .update({ hashToken: hash })
      .where({ userId: userId });
  }

  async getTokens(userId: string, login: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.JwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.JwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  hashData(password: string) {
    return bcrypt.hash(password, 10);
  }
}
