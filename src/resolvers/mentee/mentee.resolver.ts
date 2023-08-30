import { Mentee } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { MenteeEntity } from 'src/entities/mentee/mentee.entity';
import { MenteeService } from 'src/services/mentee/mentee.service';

@Resolver()
export class MenteeResolver {
  constructor(private readonly $mentee: MenteeService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [MenteeEntity], { name: 'getAllMentees' })
  public getAllMentees(): Promise<Mentee[]> {
    return this.$mentee.getAllMentees();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => MenteeEntity, { name: 'getMenteeById' })
  public getMenteeById(@Args('id', { type: () => String }) id: string): Promise<Mentee> {
    return this.$mentee.getMenteeById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MenteeEntity, { name: 'deleteMenteeProfile' })
  public deleteMenteeProfile(@Args('id', { type: () => String }) id: string): Promise<Mentee> {
    return this.$mentee.deleteMentee(id);
  }
}
