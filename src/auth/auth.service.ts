import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/user/DTO/create-user-dto';
import { IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tokens } from './DTO/token-dto';
import { FullUserDto } from 'src/user/DTO/full-user.dto';
import { FavSchema } from 'src/entities/fav.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,

    @InjectRepository(FavSchema)
    private favRep: Repository<FavSchema>,
    private JwtService: JwtService,
  ) {}

  async login(AuthUser: CreateUserDTO): Promise<Tokens> {
    const user = await this.usersRepository.findOneBy({
      login: AuthUser.login,
    });

    if (!user) throw new ForbiddenException('Access denied');   

    const rtPass = await bcrypt.compare(AuthUser.password, user.password);

    console.log(rtPass);
    

    if (!rtPass) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, AuthUser.login);

    await this.updateRtToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signup(AuthUser: CreateUserDTO): Promise<FullUserDto> {
    AuthUser.password = await this.hashData(AuthUser.password);

    const newUser = await this.usersRepository.insert(AuthUser);

    const id = newUser.identifiers[0].id;

    await this.favRep.insert({
      idUser: id,
    });

    // const tokens = await this.getTokens(id, AuthUser.login);

    // await this.updateRtToken(id, tokens.refreshToken);

    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async refreshToken(id: string, rt: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id, hashToken: Not(IsNull()) },
    });
    if (!user) throw new ForbiddenException('Access denied');

    const rtMatches = await bcrypt.compare(rt, user.hashToken);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.login);

    await this.updateRtToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRtToken(userId: string, rt: string) {
    const hash = await this.hashData(rt);

    await this.usersRepository
      .createQueryBuilder()
      .update({ hashToken: hash })
      .where({ id: userId })
      .execute();
  }

  async getTokens(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
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
      accessToken,
      refreshToken,
    };
  }
  hashData(password: string) {
    return bcrypt.hash(password, +process.env.CRYPT_SALT || 10);
  }
}
