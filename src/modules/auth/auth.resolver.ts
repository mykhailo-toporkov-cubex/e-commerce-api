import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User as CurrentUser } from './decorators/user.decorator';
import { LoginInput, RegisterInput } from './dto';
import { Auth } from './entities/auth.entitiy';
import { User } from './entities/user.entity';
import { GqlAuthGuard, GoogleAuthGuard, FacebookAuthGuard } from './guards';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Auth)
  login(
    @Args('loginInput') _loginInput: LoginInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.login(user);
  }

  @Mutation(() => Auth)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @UseGuards(GoogleAuthGuard)
  @Query(() => Auth)
  loginGoogle(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(FacebookAuthGuard)
  @Query(() => Auth)
  loginFacebook(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
