import { InputType, Field, ID } from '@nestjs/graphql';
import { Prisma, GenderType, MaritalType } from '@prisma/client';

import { CreateHardSkillInput } from '../hard-skill/hard-skill.input';
import { CreateSoftSkillInput } from '../soft-skill/soft-skill.input';
import { CreateUserCompanyInput } from '../user-company/create-user-company.input';
import { CreateUserAddressInput } from '../user-address/create-user-address.input';

@InputType()
export class CreateUserInput implements Prisma.UserUncheckedCreateInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  name: string;

  @Field()
  password: string;

  @Field(() => GenderType)
  gender: GenderType;

  @Field(() => String)
  document: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  birthDate: string;

  @Field(() => MaritalType)
  maritalStatus: MaritalType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  deleted?: Date;

  @Field(() => CreateUserCompanyInput, { nullable: true })
  company?: CreateUserCompanyInput;

  @Field(() => String, { nullable: true })
  companyId?: string;

  @Field(() => CreateUserAddressInput, { nullable: true })
  address?: CreateUserAddressInput;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => [CreateHardSkillInput], { nullable: true })
  hardSkill?: Prisma.HardSkillUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => [CreateSoftSkillInput], { nullable: true })
  softSkill?: Prisma.SoftSkillUncheckedCreateNestedManyWithoutUserInput;
}
