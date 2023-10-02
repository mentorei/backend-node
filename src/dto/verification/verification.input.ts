import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma, VerificationType } from '@prisma/client';

import { UserEntity } from 'src/entities/user/user.entity';

@InputType()
export class VerificationInput implements Prisma.VerificationUncheckedCreateInput {
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
