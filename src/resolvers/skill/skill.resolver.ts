import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { SkillService } from 'src/services/skill/skill.service';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { SkillEntity } from 'src/entities/skill/skill.entity';

@Resolver()
export class SkillResolver {
  constructor(private readonly $skill: SkillService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [SkillEntity], { name: 'listSkills' })
  public async listSkills(): Promise<SkillEntity[]> {
    return this.$skill.getAllSkills();
  }
}
