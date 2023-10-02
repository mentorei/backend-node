import { WeekdayType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MentorEntity } from '../mentor.entity';

@ObjectType()
export class MentorAvailabilityEntity {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  openingTime: string;

  @Field(() => String)
  closingTime: string;

  @Field(() => WeekdayType)
  weekday: WeekdayType;

  @Field(() => Boolean)
  inUse: boolean;

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
}
