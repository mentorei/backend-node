import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MentorAvailability, WeekdayType } from '@prisma/client';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { MentorAvailabilityService } from 'src/services/mentor/mentor-availability.service';
import { MentorAvailabilityInput } from 'src/dto/mentor/mentor-availability/mentor-availability.input';
import { MentorAvailabilityEntity } from 'src/entities/mentor/mentor-availability/mentor-availability.entity';

@Resolver()
export class MentorAvailabilityResolver {
  constructor(private $availability: MentorAvailabilityService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MentorAvailabilityEntity, { name: 'createMentorAvailability' })
  public async createMentorAvailability(
    @Args('mentorId', { type: () => String }) mentorId: string,
    @Args('openingTime', { type: () => String }) openingTime: string,
    @Args('closingTime', { type: () => String }) closingTime: string,
    @Args('weekday', { type: () => WeekdayType }) weekday: WeekdayType
  ): Promise<MentorAvailability> {
    const availability = new MentorAvailabilityInput();
    availability.mentorId = mentorId;
    availability.openingTime = openingTime;
    availability.closingTime = closingTime;
    availability.weekday = weekday;

    return this.$availability.createAvailability(availability);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MentorAvailabilityEntity, { name: 'updateMentorAvailability' })
  public async updateMentorAvailability(
    @Args('id', { type: () => String }) id: string,
    @Args('openingTime', { type: () => String, nullable: true }) openingTime?: string,
    @Args('closingTime', { type: () => String, nullable: true }) closingTime?: string,
    @Args('weekday', { type: () => WeekdayType, nullable: true }) weekday?: WeekdayType
  ): Promise<MentorAvailability> {
    const availability = new MentorAvailabilityInput();
    availability.id = id;
    availability.openingTime = openingTime;
    availability.closingTime = closingTime;
    availability.weekday = weekday;

    return this.$availability.updateAvailability(availability);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MentorAvailabilityEntity, { name: 'deleteMentorAvailability' })
  public async deleteMentorAvailability(@Args('id', { type: () => String }) id: string): Promise<MentorAvailability> {
    return this.$availability.deleteAvailability(id);
  }
}
