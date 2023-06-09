import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GenderType, MaritalType } from '@prisma/client';

import { MenteeEntity } from '../mentee/mentee.entity';
import { MentorEntity } from '../mentor/mentor.entity';
import { SoftSkillEntity } from '../soft-skill/soft-skill.entity';
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

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;

  @Field(() => String, { nullable: true })
  document?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => MaritalType, { nullable: true })
  maritalStatus?: MaritalType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => UserCompanyEntity, { nullable: true })
  company?: UserCompanyEntity;

  @Field(() => UserAddressEntity, { nullable: true })
  address?: UserAddressEntity;

  @Field(() => [HardSkillEntity], { nullable: true })
  hardSkill?: Array<HardSkillEntity>;

  @Field(() => [SoftSkillEntity], { nullable: true })
  softSkill?: Array<SoftSkillEntity>;

  @Field(() => MenteeEntity, { nullable: true })
  Mentee?: MenteeEntity;

  @Field(() => MentorEntity, { nullable: true })
  Mentor?: MentorEntity;
}
