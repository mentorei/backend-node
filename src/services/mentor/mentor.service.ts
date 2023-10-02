import { Injectable } from '@nestjs/common';
import { Mentor, Prisma, PrismaClient } from '@prisma/client';
import { FilterMentorInput } from 'src/dto/mentor/filter-mentor.input';

import { MentorInput } from 'src/dto/mentor/mentor.input';
import { PaginationInput } from 'src/dto/user/pagination.input';
import { UpsertMentorInput } from 'src/dto/mentor/upsert-mentor.input';
import { calculateTotalEvaluationsAndRating } from 'src/utils/utils';
import { MentorEntity } from 'src/entities/mentor/mentor.entity';

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

  public async getAllMentors(filters: FilterMentorInput, pagination: PaginationInput): Promise<Mentor[]> {
    const where = this.getWhereInputs(filters);
    const orderBy = this.getOrderByInputs(pagination);

    const mentors = await this.$prisma.mentor.findMany({
      skip: pagination?.skip || 0,
      take: pagination?.take || 100,
      where,
      include: {
        availabilities: true,
        evaluations: true,
        connections: true,
        user: {
          include: {
            company: true,
            address: true,
            skills: true,
          },
        },
      },
      orderBy,
    });

    const mentorsWithRatings = await Promise.all(
      mentors.map(async (mentor) => {
        const { totalEvaluations, averageRating } = calculateTotalEvaluationsAndRating(mentor.evaluations || []);

        return {
          ...mentor,
          totalEvaluations,
          averageRating,
        };
      })
    );

    return mentorsWithRatings;
  }

  public async getMentorById(id: string): Promise<MentorEntity> {
    const mentor = await this.$prisma.mentor.findUnique({
      where: { id, deleted: null },
      include: {
        availabilities: true,
        evaluations: true,
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

    if (!mentor) {
      throw new Error('Não foi possível encontrar este mentor.');
    }

    const { totalEvaluations, averageRating } = calculateTotalEvaluationsAndRating(mentor.evaluations || []);

    return {
      ...mentor,
      totalEvaluations,
      averageRating,
    };
  }

  public async updateMentor(mentor: MentorInput): Promise<Mentor> {
    const existingMentor = await this.$prisma.mentor.findUnique({ where: { id: mentor.id, deleted: null } });

    if (!existingMentor) {
      throw new Error('Perfil de mentor não encontrado.');
    }

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
      where: { id: mentor.id },
      create: data,
      update: data,
    });
  }

  public async deleteMentor(id: string): Promise<Mentor> {
    const existingMentor = await this.$prisma.mentor.findUnique({ where: { id, deleted: null } });

    if (!existingMentor) {
      throw new Error('Perfil de mentor não encontrado.');
    }

    return this.$prisma.mentor.update({ where: { id }, data: { deleted: new Date() } });
  }

  private getWhereInputs(filters: FilterMentorInput): Prisma.MentorWhereInput {
    const where: Prisma.MentorWhereInput = {
      deleted: null,
    };

    if (filters?.startDate) {
      where.createdAt = {
        gte: filters.startDate,
      };
    }
    if (filters?.endDate) {
      where.createdAt = {
        lte: filters.endDate,
      };
    }
    if (filters?.name) {
      where.user = {
        name: {
          contains: filters.name,
          mode: 'insensitive',
        },
        deleted: null,
      };
    }
    if (filters?.skillId) {
      where.user = {
        skills: {
          some: {
            id: filters.skillId,
          },
        },
      };
    }

    return where;
  }

  private getOrderByInputs(pagination: PaginationInput): Prisma.MentorOrderByWithRelationInput {
    let orderBy: Prisma.MentorOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    if (pagination?.orderBy) {
      if (pagination.orderBy === 'userName') {
        orderBy = {
          user: { name: pagination?.sortingOrder || 'desc' },
        };
      } else {
        orderBy = {
          createdAt: pagination?.sortingOrder || 'desc',
        };
      }
    }

    return orderBy;
  }
}
