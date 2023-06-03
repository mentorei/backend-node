import { Prisma, DegreeType } from '@prisma/client';
import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { UserInput } from '../user/user.input';
import { EvaluationInput } from '../evaluation/evaluation.input';
import { AvailabilityInput } from '../availability/availability.input';

@InputType()
export class MentorInput implements Prisma.MentorUncheckedCreateInput {
  @Field(() => ID)
  id: string;

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => UserInput, { nullable: true })
  User?: UserInput;

  @Field(() => String)
  userId: string;

  @Field(() => [EvaluationInput], { nullable: true })
  evaluation?: Prisma.EvaluationUncheckedCreateNestedManyWithoutMentorInput;

  @Field(() => [AvailabilityInput], { nullable: true })
  availability?: Prisma.AvailabilityUncheckedCreateNestedManyWithoutMentorInput;
}
