import { WeekdayType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AvailabilityEntity {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  openingTime: string;

  @Field(() => String)
  closingTime: string;

  @Field(() => WeekdayType)
  weekday: WeekdayType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;
}
