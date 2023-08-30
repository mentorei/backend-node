import { DegreeType } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateMentorDTO {
  @IsOptional()
  @IsUUID(4, { message: 'ID de usuário inválido.' })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O linkedin deve ser uma string válido.' })
  linkedin?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O cargo deve ser uma string válido.' })
  occupation?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A experiência deve ser uma string válida.' })
  experience?: string;

  @IsOptional()
  @IsEnum(DegreeType, { message: 'O grau de formação deve ser válido.' })
  degree?: DegreeType;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A especialidade deve ser uma string válida.' })
  expertise?: string;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor por hora precisa ser maior que zero' })
  valuePerHour?: number;

  @IsOptional()
  @IsArray()
  availability?: Array<any>;
}
