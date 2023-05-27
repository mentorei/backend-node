import { LevelType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class SoftSkillENtity {
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

  @Field(() => UserEntity, { nullable: true })
  user?: UserEntity;
}
