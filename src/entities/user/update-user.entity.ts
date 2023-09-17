import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GenderType, MaritalType } from '@prisma/client';

import { UserAddressEntity } from '../user-address/user-address.entity';
import { UserCompanyEntity } from '../user-company/user-company.entity';

@ObjectType()
export class UpdateUserEntity {
  @Field(() => ID)
  id: string;

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;

  @Field(() => String, { nullable: true })
  document?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => MaritalType, { nullable: true })
  maritalStatus?: MaritalType;

  @Field(() => UserCompanyEntity, { nullable: true })
  company?: UserCompanyEntity;

  @Field(() => UserAddressEntity, { nullable: true })
  address?: UserAddressEntity;

  @Field(() => [String], { nullable: true })
  hardSkills?: Array<string>;

  @Field(() => [String], { nullable: true })
  softSkills?: Array<string>;
}
