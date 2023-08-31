import { DegreeType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMenteeDTO {
  @IsOptional()
  @IsUUID(4, { message: 'ID de usuário inválido.' })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O linkedin deve ser uma string válida.' })
  linkedin?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A meta deve ser uma string válida.' })
  goal?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A área de interesse deve ser uma string válida.' })
  interestedArea?: string;

  @IsOptional()
  @IsEnum(DegreeType, { message: 'O grau de formação deve ser válido.' })
  degree?: DegreeType;
}
