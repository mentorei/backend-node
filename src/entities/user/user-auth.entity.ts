import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAuthEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  token: string;
}
