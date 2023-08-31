import { DegreeType, Prisma } from '@prisma/client';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpsertMenteeInput implements Prisma.MenteeUncheckedUpdateInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  goal?: string;

  @Field(() => String, { nullable: true })
  interestArea?: string;

  @Field(() => DegreeType, { nullable: true })
  degree?: DegreeType;
}
