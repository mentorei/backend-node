import { VerificationType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class VerificationEntity {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  isValid: boolean;

  @Field(() => VerificationType)
  type: VerificationType;

  @Field(() => String)
  code: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => String)
  userId: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
