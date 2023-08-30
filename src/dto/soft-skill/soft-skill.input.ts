import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma, LevelType } from '@prisma/client';

import { UserInput } from '../user/user.input';

@InputType()
export class SoftSkillInput implements Prisma.SoftSkillUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => LevelType)
  level: LevelType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => [UserInput], { nullable: true })
  users?: Array<UserInput>;
}
