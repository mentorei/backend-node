import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma, LevelType, SkillType } from '@prisma/client';

import { UserInput } from '../user/user.input';
import { ConnectionInput } from '../connection/connection.input';

@InputType()
export class SkillInput implements Prisma.SkillUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => LevelType)
  level: LevelType;

  @Field(() => SkillType)
  type: SkillType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => [UserInput], { nullable: true })
  users?: Prisma.UserUncheckedCreateNestedManyWithoutSkillsInput;

  @Field(() => [ConnectionInput], { nullable: true })
  connections?: Prisma.ConnectionUncheckedCreateNestedManyWithoutSkillInput;
}
