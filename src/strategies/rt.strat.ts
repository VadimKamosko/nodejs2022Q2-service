import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RtStrategies extends PassportStrategy(Strategy, 'JWT-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      passReqToCallBack: true,
    });
  }
  async validate(req: Request, payload: any) {
    // const authHead = req.get('authorization') || req.get('Authorization');
    // const refToken = authHead.replace('Bearer', '').trim();
    return { ...payload, rt: req.body.refreshToken };
  }
}
