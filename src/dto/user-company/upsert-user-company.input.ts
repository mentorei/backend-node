import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpsertUserCompanyInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  responsibility?: string;
}
