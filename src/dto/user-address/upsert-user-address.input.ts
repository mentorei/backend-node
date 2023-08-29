import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpsertUserAddressInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  postalCode?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  street?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  complement?: string;

  @Field(() => String, { nullable: true })
  neighborhood?: string;

  @Field(() => String, { nullable: true })
  country?: string;
}
