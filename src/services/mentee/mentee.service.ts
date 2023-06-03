import { Injectable } from '@nestjs/common';
import { Mentee, PrismaClient } from '@prisma/client';

import { MenteeInput } from 'src/dto/mentee/mentee.input';

@Injectable()
export class MenteeService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createMentee(userId: string, mentee: MenteeInput): Promise<Mentee> {
    return this.$prisma.mentee.create({
      data: {
        linkedin: mentee.linkedin,
        goal: mentee.goal,
        interestArea: mentee.interestArea,
        degree: mentee.degree,
        userId,
      },
    });
  }

  public async getAllMentees(): Promise<Mentee[]> {
    return this.$prisma.mentee.findMany({
      include: {
        Connection: true,
        user: true,
      },
    });
  }

  public async getMenteeById(id: string): Promise<Mentee> {
    const user = await this.$prisma.mentee.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar este mentorado.');
    }

    return user;
  }

  public async updateMentee(mentee: MenteeInput): Promise<Mentee> {
    this.getMenteeById(mentee.id);

    return this.$prisma.mentee.update({
      where: { id: mentee.id },
      data: {
        linkedin: mentee.linkedin,
        goal: mentee.goal,
        interestArea: mentee.interestArea,
        degree: mentee.degree,
        userId: mentee.userId,
      },
    });
  }

  public async deleteMentee(id: string): Promise<Mentee> {
    this.getMenteeById(id);

    const result = await this.$prisma.mentee.delete({ where: { id } });

    return result;
  }
}
