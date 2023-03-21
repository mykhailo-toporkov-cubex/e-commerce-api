import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOneById(@Args('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  updateOneById(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateOneById(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeOneById(@Args('id') id: string) {
    return this.userService.removeOneById(id);
  }
}
