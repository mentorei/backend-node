import { Injectable } from '@nestjs/common';
import { Mentor, Prisma, PrismaClient } from '@prisma/client';

import { MentorInput } from 'src/dto/mentor/mentor.input';
import { UpsertMentorInput } from 'src/dto/mentor/upsert-mentor.input';

@Injectable()
export class MentorService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createMentor(mentor: MentorInput): Promise<Mentor> {
    return this.$prisma.mentor.create({
      data: {
        linkedin: mentor.linkedin,
        occupation: mentor.occupation,
        experience: mentor.experience,
        degree: mentor.degree,
        expertise: mentor.expertise,
        valuePerHour: mentor.valuePerHour,
      },
    });
  }

  public async getAllMentors(): Promise<Mentor[]> {
    return this.$prisma.mentor.findMany({
      include: {
        availability: true,
        evaluation: true,
        Connection: true,
        User: true,
      },
    });
  }

  public async getMentorById(id: string): Promise<Mentor> {
    const user = await this.$prisma.mentor.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Não foi possível encontrar este mentor.');
    }

    return user;
  }

  public async updateMentor(mentor: MentorInput): Promise<Mentor> {
    this.getMentorById(mentor.id);

    return this.$prisma.mentor.update({
      where: { id: mentor.id },
      data: {
        linkedin: mentor.linkedin,
        occupation: mentor.occupation,
        experience: mentor.experience,
        degree: mentor.degree,
        expertise: mentor.expertise,
        valuePerHour: mentor.valuePerHour,
      },
    });
  }

  public async upsertMentor(mentor: UpsertMentorInput): Promise<Mentor> {
    const data: Prisma.MentorUncheckedCreateInput = {
      linkedin: mentor.linkedin,
      occupation: mentor.linkedin,
      experience: mentor.linkedin,
      degree: mentor.degree,
      expertise: mentor.linkedin,
      valuePerHour: mentor.valuePerHour,
    };

    return this.$prisma.mentor.upsert({
      where: { id: mentor.id || '' },
      create: data,
      update: data,
    });
  }
}
