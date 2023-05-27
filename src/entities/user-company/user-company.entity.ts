import { Prisma } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class UserCompanyEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  name: string;

  @Field()
  responsibility: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  deleted?: Date;

  @Field(() => [UserEntity], { nullable: true })
  User?: Prisma.UserUncheckedCreateNestedOneWithoutCompanyInput;
}
