import { Prisma } from '@prisma/client';
import { InputType, Field, ID } from '@nestjs/graphql';

import { CreateUserInput } from '../user/create-user.input';

@InputType()
export class CreateUserCompanyInput implements Prisma.UserCompanyUncheckedCreateInput {
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

  @Field(() => [CreateUserInput], { nullable: true })
  User?: Prisma.UserUncheckedCreateNestedOneWithoutCompanyInput;
}
