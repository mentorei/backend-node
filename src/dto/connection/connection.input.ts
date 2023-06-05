import { Prisma } from '@prisma/client';
import { InputType, Field, ID } from '@nestjs/graphql';

import { MentorEntity } from 'src/entities/mentor/mentor.entity';
import { MenteeEntity } from 'src/entities/mentee/mentee.entity';

@InputType()
export class ConnectionInput implements Prisma.ConnectionUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  meetUrl: string;

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
