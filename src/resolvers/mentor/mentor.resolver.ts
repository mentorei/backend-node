import { Mentor } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationInput } from 'src/dto/user/pagination.input';
import { MentorEntity } from 'src/entities/mentor/mentor.entity';
import { MentorService } from 'src/services/mentor/mentor.service';
import { FilterMentorInput } from 'src/dto/mentor/filter-mentor.input';

@Resolver()
export class MentorResolver {
  constructor(private readonly $mentor: MentorService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [MentorEntity], { name: 'getAllMentors' })
  public getAllMentors(
    @Args('filters', { type: () => FilterMentorInput, nullable: true }) filters?: any,
    @Args('pagination', { type: () => PaginationInput, nullable: true }) pagination?: any
  ): Promise<Mentor[]> {
    return this.$mentor.getAllMentors(filters, pagination);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => MentorEntity, { name: 'getMentorById' })
  public getMentorById(@Args('id', { type: () => String }) id: string): Promise<MentorEntity> {
    return this.$mentor.getMentorById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MentorEntity, { name: 'deleteMentorProfile' })
  public deleteMentorProfile(@Args('id', { type: () => String }) id: string): Promise<Mentor> {
    return this.$mentor.deleteMentor(id);
  }
}
