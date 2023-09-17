import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateMentorEvaluationDTO {
  @IsNotEmpty({ message: 'A avaliação é obrigatória.' })
  @IsNumber({}, { message: 'A avaliação deve ser um número válido.' })
  @Min(1, { message: 'A avaliação deve ser no mínimo 1.' })
  @Max(5, { message: 'A avaliação deve ser no máximo 5.' })
  rating: number;

  @IsNotEmpty({ message: 'O ID do mentor é obrigatório.' })
  @IsString({ message: 'O ID do mentor deve ser uma string válida.' })
  mentorId?: string;

  @IsNotEmpty({ message: 'O ID do mentorado é obrigatório.' })
  @IsString({ message: 'O ID do mentorado deve ser uma string válida.' })
  menteeId?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string válida.' })
  description?: string;
}
