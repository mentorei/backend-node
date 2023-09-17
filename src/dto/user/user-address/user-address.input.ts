import { Prisma } from '@prisma/client';
import { InputType, Field, ID, Int } from '@nestjs/graphql';

import { UserInput } from '../user.input';

@InputType()
export class UserAddressInput implements Prisma.UserAddressUncheckedCreateInput {
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => UserInput, { nullable: true })
  user?: Prisma.UserUncheckedCreateNestedOneWithoutAddressInput;
}
