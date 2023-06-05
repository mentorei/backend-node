import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma, GenderType, MaritalType } from '@prisma/client';

import { HardSkillInput } from '../hard-skill/hard-skill.input';
import { SoftSkillInput } from '../soft-skill/soft-skill.input';
import { UserCompanyInput } from '../user-company/user-company.input';
import { UserAddressInput } from '../user-address/user-address.input';

@InputType()
export class UserInput implements Prisma.UserUncheckedCreateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;

  @Field(() => String, { nullable: true })
  document?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => MaritalType)
  maritalStatus: MaritalType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => UserCompanyInput, { nullable: true })
  company?: UserCompanyInput;

  @Field(() => String, { nullable: true })
  companyId?: string;

  @Field(() => UserAddressInput, { nullable: true })
  address?: UserAddressInput;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => [HardSkillInput], { nullable: true })
  hardSkill?: Prisma.HardSkillUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => [SoftSkillInput], { nullable: true })
  softSkill?: Prisma.SoftSkillUncheckedCreateNestedManyWithoutUserInput;
}
