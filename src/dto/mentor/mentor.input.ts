import { Prisma, DegreeType } from '@prisma/client';
import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { UserInput } from '../user/user.input';
import { ConnectionInput } from '../connection/connection.input';
import { MentorEvaluationInput } from './mentor-evaluation/mentor-evaluation.input';
import { MentorAvailabilityInput } from './mentor-availability/mentor-availability.input';

@InputType()
export class MentorInput implements Prisma.MentorUncheckedCreateInput {
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => UserInput, { nullable: true })
  user?: Prisma.UserUncheckedCreateNestedOneWithoutMentorInput;

  @Field(() => [MentorEvaluationInput], { nullable: true })
  evaluations?: Prisma.MentorEvaluationUncheckedCreateNestedManyWithoutMentorInput;

  @Field(() => [MentorAvailabilityInput], { nullable: true })
  availabilities?: Prisma.MentorAvailabilityUncheckedCreateNestedManyWithoutMentorInput;

  @Field(() => [ConnectionInput], { nullable: true })
  connections?: Prisma.ConnectionUncheckedCreateNestedManyWithoutMentorInput;
}
