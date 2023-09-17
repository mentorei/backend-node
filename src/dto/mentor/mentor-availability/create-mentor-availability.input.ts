import { WeekdayType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMentorAvailabilityDTO {
  @IsNotEmpty({ message: 'O ID do mentor é obrigatório.' })
  @IsString({ message: 'O ID do mentor deve ser uma string válida.' })
  mentorId: string;

  @IsNotEmpty({ message: 'O horário de início é obrigatório.' })
  @IsString({ message: 'O horário de início deve ser uma string válida.' })
  openingTime?: string;

  @IsNotEmpty({ message: 'O horário de fim é obrigatório.' })
  @IsString({ message: 'O horário de fim deve ser uma string válida.' })
  closingTime?: string;

  @IsEnum(WeekdayType, { message: 'O dia da semana deve ser válido.' })
  weekday?: WeekdayType;
}
