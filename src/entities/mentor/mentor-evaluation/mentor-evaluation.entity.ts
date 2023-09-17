import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { MenteeEntity } from 'src/entities/mentee/mentee.entity';

import { MentorEntity } from 'src/entities/mentor/mentor.entity';

@ObjectType()
export class MentorEvaluationEntity {
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
  mentor?: MentorEntity;

  @Field(() => String)
  menteeId: string;

  @Field(() => MenteeEntity, { nullable: true })
  mentee?: MenteeEntity;
}
