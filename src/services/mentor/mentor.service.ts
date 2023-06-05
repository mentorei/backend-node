import { Injectable } from '@nestjs/common';
import { Mentor, PrismaClient } from '@prisma/client';

import { MentorInput } from 'src/dto/mentor/mentor.input';

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
        userId: mentor.userId,
      },
    });
  }

  public async getAllMentors(): Promise<Mentor[]> {
    return this.$prisma.mentor.findMany({
      include: {
        availability: true,
        evaluation: true,
        Connection: true,
        user: true,
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
}
