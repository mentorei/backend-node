import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { MentorAvailability, PrismaClient } from '@prisma/client';

import { MentorAvailabilityInput } from 'src/dto/mentor/mentor-availability/mentor-availability.input';
import { CreateMentorAvailabilityDTO } from 'src/dto/mentor/mentor-availability/create-mentor-availability.input';
import { UpdateMentorAvailabilityDTO } from 'src/dto/mentor/mentor-availability/update-mentor-availability.input';

@Injectable()
export class MentorAvailabilityService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async createAvailability(availability: MentorAvailabilityInput): Promise<MentorAvailability> {
    const dto = new CreateMentorAvailabilityDTO();
    dto.mentorId = availability.mentorId;
    dto.openingTime = availability.openingTime;
    dto.closingTime = availability.closingTime;
    dto.weekday = availability.weekday;

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0]);
    }

    return this.$prisma.mentorAvailability.create({
      data: {
        mentorId: availability.mentorId,
        openingTime: availability.openingTime,
        closingTime: availability.closingTime,
        weekday: availability.weekday,
      },
    });
  }

  public async getMentorAvailabilityById(id: string): Promise<MentorAvailability> {
    const existingAvailability = await this.$prisma.mentorAvailability.findUnique({ where: { id } });

    if (!existingAvailability) {
      throw new Error('Horário não encontrado.');
    }

    return existingAvailability;
  }

  public async updateAvailability(availability: MentorAvailabilityInput): Promise<MentorAvailability> {
    await this.getMentorAvailabilityById(availability.id);

    const dto = new UpdateMentorAvailabilityDTO();
    dto.id = availability.id;
    dto.openingTime = availability.openingTime;
    dto.closingTime = availability.closingTime;
    dto.weekday = availability.weekday;

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error(Object.values(errors[0].constraints)[0]);
    }

    return this.$prisma.mentorAvailability.update({
      where: { id: availability.id },
      data: {
        openingTime: availability.openingTime,
        closingTime: availability.closingTime,
        weekday: availability.weekday,
      },
    });
  }

  public async deleteAvailability(id: string): Promise<MentorAvailability> {
    await this.getMentorAvailabilityById(id);

    const result = await this.$prisma.mentorAvailability.delete({ where: { id } });

    return result;
  }
}
