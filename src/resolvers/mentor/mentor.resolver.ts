import { Mentor } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { MentorEntity } from 'src/entities/mentor/mentor.entity';
import { MentorService } from 'src/services/mentor/mentor.service';

@Resolver()
export class MentorResolver {
  constructor(private readonly $mentor: MentorService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [MentorEntity], { name: 'getAllMentors' })
  public getAllMentors(): Promise<Mentor[]> {
    return this.$mentor.getAllMentors();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => MentorEntity, { name: 'getMentorById' })
  public getMentorById(@Args('id', { type: () => String }) id: string): Promise<Mentor> {
    return this.$mentor.getMentorById(id);
  }
}
