import { Prisma } from '@prisma/client';
import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { CreateUserInput } from '../user/create-user.input';

@InputType()
export class CreateUserAddressInput implements Prisma.UserAddressUncheckedCreateInput {
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

  @Field(() => CreateUserInput)
  User: Prisma.UserUncheckedCreateNestedOneWithoutAddressInput;
}
