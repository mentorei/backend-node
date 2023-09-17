import { DegreeType } from '@prisma/client';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';
import { ConnectionEntity } from '../connection/connection.entity';
import { MentorEvaluationEntity } from './mentor-evaluation/mentor-evaluation.entity';
import { MentorAvailabilityEntity } from './mentor-availability/mentor-availability.entity';

@ObjectType()
export class MentorEntity {
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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => Int, { nullable: true })
  totalAvaliations?: number;

  @Field(() => Float, { nullable: true })
  averageRating?: number | string;

  @Field(() => [MentorEvaluationEntity], { nullable: true })
  evaluations?: Array<MentorEvaluationEntity>;

  @Field(() => [MentorAvailabilityEntity], { nullable: true })
  availabilities?: Array<MentorAvailabilityEntity>;

  @Field(() => [ConnectionEntity], { nullable: true })
  connections?: Array<ConnectionEntity>;

  @Field(() => UserEntity, { nullable: true })
  user?: any;
}
