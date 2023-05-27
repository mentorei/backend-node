import { Prisma } from '@prisma/client';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UserEntity } from '../user/user.entity';

@ObjectType()
export class UserAddressEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  postalCode: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  street: string;

  @Field(() => Int)
  number: number;

  @Field(() => String, { nullable: true })
  complement?: string;

  @Field(() => String)
  neighborhood: string;

  @Field(() => String)
  country: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  deleted?: Date;

  @Field(() => UserEntity)
  User: Prisma.UserUncheckedCreateNestedOneWithoutAddressInput;
}
