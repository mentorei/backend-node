import { Prisma } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class UserCompanyEntity {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  responsibility?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => [UserEntity], { nullable: true })
  User?: Prisma.UserUncheckedCreateNestedOneWithoutCompanyInput;
}
