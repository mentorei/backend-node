import { LevelType } from '@prisma/client';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SoftSkillInput } from 'src/dto/soft-skill/soft-skill.input';
import { SoftSkillEntity } from 'src/entities/soft-skill/soft-skill.entity';
import { SoftSkillService } from 'src/services/soft-skill/soft-skill.service';

@Resolver()
export class SoftSkillResolver {
  constructor(private readonly $softSkill: SoftSkillService) {}

  @Mutation(() => SoftSkillEntity, { name: 'createSoftSkill' })
  public async createSoftSkill(
    @Args('name', { type: () => String }) name: string,
    @Args('level', { type: () => LevelType }) level: LevelType,
    @Args('userId', { type: () => String }) userId: string,
    @Args('description', { type: () => String, nullable: true }) description?: string
  ): Promise<SoftSkillEntity> {
    const user = new SoftSkillInput();
    user.name = name;
    user.level = level;
    user.description = description;
    user.userId = userId;

    const userCreated = await this.$softSkill.createSoftSkill(user);

    return userCreated;
  }
}
