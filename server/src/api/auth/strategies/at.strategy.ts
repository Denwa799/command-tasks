import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('PRIVATE_KEY') || 'SECRET',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const accessToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      accessToken,
    };
  }
}
