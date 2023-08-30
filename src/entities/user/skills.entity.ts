import { ObjectType, Field } from '@nestjs/graphql';
import { HardSkill, SoftSkill } from '@prisma/client';

import { SoftSkillEntity } from '../soft-skill/soft-skill.entity';
import { HardSkillEntity } from '../hard-skill/hard-skill.entity';

@ObjectType()
export class SkillsEntity {
  @Field(() => [HardSkillEntity], { nullable: true })
  hardSkills?: Array<HardSkill>;

  @Field(() => [SoftSkillEntity], { nullable: true })
  softSkills?: Array<SoftSkill>;
}
