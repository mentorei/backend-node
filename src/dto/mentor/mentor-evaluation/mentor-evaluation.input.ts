import { Prisma } from '@prisma/client';
import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { MentorEntity } from 'src/entities/mentor/mentor.entity';

@InputType()
export class MentorEvaluationInput implements Prisma.MentorEvaluationUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  rating: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => String)
  mentorId: string;

  @Field(() => MentorEntity, { nullable: true })
  mentor?: Prisma.MentorEvaluationUncheckedUpdateManyWithoutMentorNestedInput;

  @Field(() => String)
  menteeId: string;

  @Field(() => MentorEntity, { nullable: true })
  mentee?: Prisma.MentorEvaluationUncheckedUpdateManyWithoutMenteeNestedInput;
}
