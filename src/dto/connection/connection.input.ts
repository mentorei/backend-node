import { InputType, Field, ID } from '@nestjs/graphql';
import { ConnectionStatusType, Prisma } from '@prisma/client';

import { MentorEntity } from 'src/entities/mentor/mentor.entity';
import { MenteeEntity } from 'src/entities/mentee/mentee.entity';
import { AvailabilityEntity } from 'src/entities/availability/availability.entity';

@InputType()
export class ConnectionInput implements Prisma.ConnectionUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  meetUrl?: string;

  @Field(() => String, { nullable: true })
  requestDescription: string;

  @Field(() => ConnectionStatusType)
  status: ConnectionStatusType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => String)
  mentorAvailabilityId: string;

  @Field(() => AvailabilityEntity, { nullable: true })
  availability?: AvailabilityEntity;

  @Field(() => String)
  mentorId: string;

  @Field(() => MentorEntity, { nullable: true })
  mentor?: MentorEntity;

  @Field(() => String)
  menteeId: string;

  @Field(() => MenteeEntity, { nullable: true })
  mentee?: MenteeEntity;
}
