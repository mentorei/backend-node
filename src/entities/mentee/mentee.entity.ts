import { DegreeType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class MenteeEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  goal?: string;

  @Field(() => String, { nullable: true })
  interestArea?: string;

  @Field(() => DegreeType, { nullable: true })
  degree?: DegreeType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => UserEntity, { nullable: true })
  User?: UserEntity;

  @Field(() => String)
  userId: string;
}
