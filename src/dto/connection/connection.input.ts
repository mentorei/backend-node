import { InputType, Field, ID } from '@nestjs/graphql';
import { ConnectionStatusType, Prisma } from '@prisma/client';

import { MentorEntity } from 'src/entities/mentor/mentor.entity';
import { MenteeEntity } from 'src/entities/mentee/mentee.entity';
import { MentorAvailabilityEntity } from 'src/entities/mentor/mentor-availability/mentor-availability.entity';
import { SkillEntity } from 'src/entities/skill/skill.entity';

@InputType()
export class ConnectionInput implements Prisma.ConnectionUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  meetUrl?: string;

  @Field(() => String, { nullable: true })
  requestDescription?: string;

  @Field(() => ConnectionStatusType)
  status: ConnectionStatusType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => String)
  skillId: string;

  @Field(() => SkillEntity, { nullable: true })
  skill?: SkillEntity;

  @Field(() => String)
  mentorAvailabilityId: string;

  @Field(() => MentorAvailabilityEntity, { nullable: true })
  mentorAvailability?: MentorAvailabilityEntity;

  @Field(() => String)
  mentorId: string;

  @Field(() => MentorEntity, { nullable: true })
  mentor?: MentorEntity;

  @Field(() => String)
  menteeId: string;

  @Field(() => MenteeEntity, { nullable: true })
  mentee?: MenteeEntity;
}
