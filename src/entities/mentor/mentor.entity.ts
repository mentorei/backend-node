import { DegreeType } from '@prisma/client';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class MentorEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  occupation?: string;

  @Field(() => String, { nullable: true })
  experience?: string;

  @Field(() => DegreeType, { nullable: true })
  degree?: DegreeType;

  @Field(() => String, { nullable: true })
  expertise?: string;

  @Field(() => Int, { nullable: true })
  valuePerHour?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => UserEntity, { nullable: true })
  User?: UserEntity;
}
