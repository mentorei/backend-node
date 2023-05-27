import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma, LevelType } from '@prisma/client';

import { CreateUserInput } from '../user/create-user.input';

@InputType()
export class CreateHardSkillInput implements Prisma.HardSkillUncheckedCreateInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  name: string;

  @Field(() => LevelType)
  level: LevelType;

  @Field(() => String)
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  deleted?: Date;

  @Field(() => String)
  userId: string;

  @Field(() => CreateUserInput, { nullable: true })
  user?: CreateUserInput;
}
