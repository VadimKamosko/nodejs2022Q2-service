import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  email: string;
  sub: number;
};

@Injectable()
export class RtStrategies extends PassportStrategy(Strategy, 'JWT-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: JwtPayload) {
    return { ...payload, rt: req.body.refreshToken };
  }
}
