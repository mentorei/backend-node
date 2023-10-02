import { Prisma, WeekdayType } from '@prisma/client';
import { InputType, Field, ID } from '@nestjs/graphql';

import { MentorEntity } from 'src/entities/mentor/mentor.entity';

@InputType()
export class MentorAvailabilityInput implements Prisma.MentorAvailabilityUncheckedCreateInput {
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
  mentor?: Prisma.MentorAvailabilityUncheckedUpdateManyWithoutMentorNestedInput;
}
