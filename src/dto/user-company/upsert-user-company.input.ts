import { Prisma } from '@prisma/client';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpsertUserCompanyInput implements Prisma.UserCompanyUncheckedUpdateInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  responsibility?: string;
}
