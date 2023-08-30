import { LevelType, Prisma } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class HardSkillEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

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

  @Field(() => [UserEntity], { nullable: true })
  users?: Prisma.UserUncheckedCreateNestedManyWithoutHardSkillsInput;
}
