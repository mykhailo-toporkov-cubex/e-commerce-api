import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
