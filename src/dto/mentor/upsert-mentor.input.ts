import { DegreeType, Prisma } from '@prisma/client';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpsertMentorInput implements Prisma.MentorUncheckedUpdateInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  occupation?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => DegreeType, { nullable: true })
  degree?: DegreeType;

  @Field(() => String, { nullable: true })
  expertise?: string;

  @Field(() => Int, { nullable: true })
  valuePerHour?: number;
}
