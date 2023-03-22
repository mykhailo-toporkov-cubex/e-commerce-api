import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook-token-nest';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(config: ConfigService, private authService: AuthService) {
    super({
      clientID: config.get<string>('FACEBOOK_APP_ID'),
      clientSecret: config.get<string>('FACEBOOK_APP_SECRET'),
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    _done: VerifyCallback,
  ) {
    const { last_name, first_name, email } = profile._json;
    const user = await this.authService.findOrCreateUser({
      fistName: first_name,
      lastName: last_name,
      email,
      password: email,
      role: 'CLIENT',
      photo: '',
    });

    return user;
  }
}
