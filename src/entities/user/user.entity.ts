import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GenderType, MaritalType, Prisma } from '@prisma/client';

import { SoftSkillENtity } from '../soft-skill/soft-skill.entity';
import { HardSkillEntity } from '../hard-skill/hard-skill.entity';
import { UserCompanyEntity } from '../user-company/user-company.entity';
import { UserAddressEntity } from '../user-address/user-address.entity';

@ObjectType()
export class UserEntity {
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

  @Field(() => UserCompanyEntity, { nullable: true })
  company?: UserCompanyEntity;

  @Field(() => String, { nullable: true })
  companyId?: string;

  @Field(() => UserAddressEntity, { nullable: true })
  address?: UserAddressEntity;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => [HardSkillEntity], { nullable: true })
  hardSkill?: Prisma.HardSkillUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => [SoftSkillENtity], { nullable: true })
  softSkill?: Prisma.SoftSkillUncheckedCreateNestedManyWithoutUserInput;
}
