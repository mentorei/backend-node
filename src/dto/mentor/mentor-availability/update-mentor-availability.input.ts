import { WeekdayType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMentorAvailabilityDTO {
  @IsNotEmpty({ message: 'O ID da disponibilidade é obrigatório.' })
  @IsString({ message: 'O ID da disponibilidade deve ser uma string válida.' })
  id: string;

  @IsOptional()
  @IsString({ message: 'O horário de início deve ser uma string válida.' })
  openingTime?: string;

  @IsOptional()
  @IsString({ message: 'O horário de fim deve ser uma string válida.' })
  closingTime?: string;

  @IsOptional()
  @IsEnum(WeekdayType, { message: 'O dia da semana deve ser válido.' })
  weekday?: WeekdayType;
}
