import { Prisma, DegreeType } from '@prisma/client';
import { InputType, Field, ID } from '@nestjs/graphql';

import { UserInput } from '../user/user.input';
import { ConnectionInput } from '../connection/connection.input';

@InputType()
export class MenteeInput implements Prisma.MenteeUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  goal?: string;

  @Field(() => String, { nullable: true })
  interestArea?: string;

  @Field(() => DegreeType, { nullable: true })
  degree?: DegreeType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => UserInput, { nullable: true })
  user?: Prisma.UserUncheckedCreateNestedOneWithoutMentorInput;

  @Field(() => [ConnectionInput], { nullable: true })
  connection?: Prisma.ConnectionUncheckedCreateNestedManyWithoutMenteeInput;
}
