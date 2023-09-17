import { UseGuards } from '@nestjs/common';
import { MentorEvaluation } from '@prisma/client';
import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConnectionService } from 'src/services/connection/connection.service';
import { MentorEvaluationService } from 'src/services/mentor/mentor-evaluation.service';
import { MentorEvaluationInput } from 'src/dto/mentor/mentor-evaluation/mentor-evaluation.input';
import { MentorEvaluationEntity } from 'src/entities/mentor/mentor-evaluation/mentor-evaluation.entity';

@Resolver()
export class MentorEvaluationResolver {
  constructor(private $connection: ConnectionService, private $evaluation: MentorEvaluationService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MentorEvaluationEntity, { name: 'createMentorEvaluation' })
  public async createMentorEvaluation(
    @Args('rating', { type: () => Int }) rating: number,
    @Args('mentorId', { type: () => String }) mentorId: string,
    @Args('menteeId', { type: () => String }) menteeId: string,
    @Args('description', { type: () => String, nullable: true }) description?: string
  ): Promise<MentorEvaluation> {
    await this.$connection.validateConnection(mentorId, menteeId);

    const evaluation = new MentorEvaluationInput();
    evaluation.rating = rating;
    evaluation.description = description;
    evaluation.mentorId = mentorId;
    evaluation.menteeId = menteeId;

    return this.$evaluation.createEvaluation(evaluation);
  }
}
