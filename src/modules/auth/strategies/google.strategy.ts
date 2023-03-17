import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3333/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    _done: VerifyCallback,
  ) {
    const user = {
      fistName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      password: profile.id,
      role: 'CLIENT',
    };

    return user;
  }
}
