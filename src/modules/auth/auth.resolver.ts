import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User as CurrentUser } from './decorators/user.decorator';
import { LoginInput, RegisterInput } from './dto';
import { Auth } from './entities/auth.entitiy';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User } from './entities/user.entity';

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
}
