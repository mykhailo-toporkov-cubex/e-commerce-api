import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-verify-token';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

interface GoogleToken {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService, private authService: AuthService) {
    super({
      clientId: config.get<string>('GOOGLE_CLIENT_ID'),
    });
  }

  async validate({ email, given_name, family_name }: GoogleToken) {
    const user = await this.authService.findOrCreateUser({
      fistName: given_name,
      lastName: family_name,
      email,
      password: email,
      role: 'CLIENT',
      photo: '',
    });

    return user;
  }
}
