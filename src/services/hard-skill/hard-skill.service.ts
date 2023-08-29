import { Injectable } from '@nestjs/common';
import { PrismaClient, HardSkill } from '@prisma/client';

import { HardSkillInput } from 'src/dto/hard-skill/hard-skill.input';
import { HardSkillEntity } from 'src/entities/hard-skill/hard-skill.entity';

@Injectable()
export class HardSkillService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createHardSkill(hardSkill: HardSkillInput): Promise<HardSkill> {
    return this.$prisma.hardSkill.create({
      data: {
        name: hardSkill.name,
        level: hardSkill.level,
        description: hardSkill.description,
      },
    });
  }

  public async getHardSkillById(id: string): Promise<HardSkill> {
    const user = await this.$prisma.hardSkill.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar esta habilidade.');
    }

    return user;
  }

  public async updateHardSkill(hardSkill: HardSkillInput): Promise<HardSkill> {
    this.getHardSkillById(hardSkill.id);

    return this.$prisma.hardSkill.update({
      where: { id: hardSkill.id },
      data: {
        name: hardSkill.name,
        level: hardSkill.level,
        description: hardSkill.description,
      },
    });
  }

  public async getManyHardSkillById(ids: Array<string>): Promise<HardSkillEntity[]> {
    const user = await this.$prisma.hardSkill.findMany({
      where: { id: { in: ids } },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar estas HardSkills.');
    }

    return user;
  }
}
