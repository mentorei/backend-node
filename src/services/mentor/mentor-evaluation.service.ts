import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { MentorEvaluation, PrismaClient } from '@prisma/client';

import { MentorEvaluationInput } from 'src/dto/mentor/mentor-evaluation/mentor-evaluation.input';
import { CreateMentorEvaluationDTO } from 'src/dto/mentor/mentor-evaluation/create-mentor-evaluation.input';

@Injectable()
export class MentorEvaluationService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createEvaluation(evaluation: MentorEvaluationInput): Promise<MentorEvaluation> {
    const dto = new CreateMentorEvaluationDTO();
    dto.rating = evaluation.rating;
    dto.mentorId = evaluation.mentorId;
    dto.menteeId = evaluation.menteeId;
    dto.description = evaluation.description;

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0]);
    }

    return this.$prisma.mentorEvaluation.create({
      data: {
        rating: evaluation.rating,
        description: evaluation.description,
        mentorId: evaluation.mentorId,
        menteeId: evaluation.menteeId,
      },
    });
  }
}
