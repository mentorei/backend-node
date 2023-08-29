import { Injectable } from '@nestjs/common';
import { PrismaClient, SoftSkill } from '@prisma/client';

import { SoftSkillInput } from 'src/dto/soft-skill/soft-skill.input';

@Injectable()
export class SoftSkillService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createSoftSkill(softSkill: SoftSkillInput): Promise<SoftSkill> {
    return this.$prisma.softSkill.create({
      data: {
        name: softSkill.name,
        level: softSkill.level,
        description: softSkill.description,
      },
    });
  }

  public async getSoftSkillById(id: string): Promise<SoftSkill> {
    const user = await this.$prisma.softSkill.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar esta SoftSkill.');
    }

    return user;
  }

  public async updateSoftSkill(softSkill: SoftSkillInput): Promise<SoftSkill> {
    this.getSoftSkillById(softSkill.id);

    return this.$prisma.softSkill.update({
      where: { id: softSkill.id },
      data: {
        name: softSkill.name,
        level: softSkill.level,
        description: softSkill.description,
      },
    });
  }

  public async getAllSoftSkills(): Promise<SoftSkill[]> {
    return this.$prisma.softSkill.findMany();
  }

  public async getManySoftSkillById(ids: Array<string>): Promise<SoftSkill[]> {
    const user = await this.$prisma.softSkill.findMany({
      where: { id: { in: ids } },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar estas SoftSkills.');
    }

    return user;
  }
}
