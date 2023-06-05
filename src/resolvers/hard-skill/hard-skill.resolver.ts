import { LevelType } from '@prisma/client';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { HardSkillInput } from 'src/dto/hard-skill/hard-skill.input';
import { HardSkillEntity } from 'src/entities/hard-skill/hard-skill.entity';
import { HardSkillService } from 'src/services/hard-skill/hard-skill.service';

@Resolver()
export class HardSkillResolver {
  constructor(private readonly $hardSkill: HardSkillService) {}

  @Mutation(() => HardSkillEntity, { name: 'createHardSkill' })
  public async createHardSkill(
    @Args('name', { type: () => String }) name: string,
    @Args('level', { type: () => LevelType }) level: LevelType,
    @Args('userId', { type: () => String }) userId: string,
    @Args('description', { type: () => String, nullable: true }) description?: string
  ): Promise<HardSkillEntity> {
    const user = new HardSkillInput();
    user.name = name;
    user.level = level;
    user.description = description;
    user.userId = userId;

    const userCreated = await this.$hardSkill.createHardSkill(user);

    return userCreated;
  }
}
