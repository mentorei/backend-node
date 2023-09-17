import { Injectable } from '@nestjs/common';
import { PrismaClient, Skill } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async getSkillById(id: string): Promise<Skill> {
    const user = await this.$prisma.skill.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar esta habilidade.');
    }

    return user;
  }

  public async getAllSkills(): Promise<Skill[]> {
    return this.$prisma.skill.findMany();
  }

  public async getManySkillById(ids: Array<string>): Promise<Skill[]> {
    const user = await this.$prisma.skill.findMany({
      where: { id: { in: ids } },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar estas habilidade.');
    }

    return user;
  }
}
