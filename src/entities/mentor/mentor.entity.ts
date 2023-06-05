import { DegreeType } from '@prisma/client';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { EvaluationEntity } from '../evaluation/evaluation.entity';
import { AvailabilityEntity } from '../availability/availability.entity';

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

  @Field(() => [EvaluationEntity], { nullable: true })
  evaluation?: Array<EvaluationEntity>;

  @Field(() => [AvailabilityEntity], { nullable: true })
  availability?: Array<AvailabilityEntity>;
}
