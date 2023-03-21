import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {
  GoogleStrategy,
  JwtStrategy,
  LocalStrategy,
  FacebookStrategy,
} from './strategies';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
