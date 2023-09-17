import { Prisma } from '@prisma/client';
import { InputType, Field, ID } from '@nestjs/graphql';

import { UserInput } from '../user.input';

@InputType()
export class UserCompanyInput implements Prisma.UserCompanyUncheckedCreateInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  responsibility?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => [UserInput], { nullable: true })
  user?: Prisma.UserUncheckedCreateNestedOneWithoutCompanyInput;
}
