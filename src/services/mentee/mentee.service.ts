import { Injectable } from '@nestjs/common';
import { Mentee, Prisma, PrismaClient } from '@prisma/client';

import { MenteeInput } from 'src/dto/mentee/mentee.input';
import { UpsertMenteeInput } from 'src/dto/mentee/upsert-mentee.input';

@Injectable()
export class MenteeService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createMentee(mentee: MenteeInput): Promise<Mentee> {
    return this.$prisma.mentee.create({
      data: {
        linkedin: mentee.linkedin,
        goal: mentee.goal,
        interestArea: mentee.interestArea,
        degree: mentee.degree,
      },
    });
  }

  public async getAllMentees(): Promise<Mentee[]> {
    return this.$prisma.mentee.findMany({
      where: { deleted: null },
      include: {
        connections: true,
        user: {
          include: {
            company: true,
            address: true,
            skills: true,
          },
        },
      },
    });
  }

  public async getMenteeById(id: string): Promise<Mentee> {
    const mentee = await this.$prisma.mentee.findUnique({
      where: { id, deleted: null },
      include: {
        connections: true,
        user: {
          include: {
            company: true,
            address: true,
            skills: true,
          },
        },
      },
    });

    if (!mentee) {
      throw new Error('Não foi possível encontrar este mentorado.');
    }

    return mentee;
  }

  public async updateMentee(mentee: MenteeInput): Promise<Mentee> {
    await this.getMenteeById(mentee.id);

    return this.$prisma.mentee.update({
      where: { id: mentee.id },
      data: {
        linkedin: mentee.linkedin,
        goal: mentee.goal,
        interestArea: mentee.interestArea,
        degree: mentee.degree,
      },
    });
  }

  public async upsertMentee(mentor: UpsertMenteeInput): Promise<Mentee> {
    const data: Prisma.MenteeUncheckedCreateInput = {
      linkedin: mentor.linkedin,
      goal: mentor.goal,
      interestArea: mentor.interestArea,
      degree: mentor.degree,
    };

    return this.$prisma.mentee.upsert({
      where: { id: mentor.id },
      create: data,
      update: data,
    });
  }

  public async deleteMentee(id: string): Promise<Mentee> {
    const existingMentee = await this.$prisma.mentee.findUnique({ where: { id, deleted: null } });

    if (!existingMentee) {
      throw new Error('Perfil de mentorado não encontrado.');
    }

    const result = await this.$prisma.mentee.update({ where: { id }, data: { deleted: new Date() } });

    return result;
  }
}
