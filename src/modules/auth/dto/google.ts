import { InputType, Field, registerEnumType } from '@nestjs/graphql';

@InputType()
export class GoogleInput {
  @Field(() => String)
  accessToken: string;
}
