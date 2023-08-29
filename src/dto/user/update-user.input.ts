import { GenderType, MaritalType } from '@prisma/client';
import { IsArray, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  id: string;

  @IsOptional()
  @IsString({ message: 'O gênero deve ser uma string válida.' })
  gender?: GenderType;

  @IsOptional()
  @IsString({ message: 'O codumento deve ser uma string válida.' })
  document?: string;

  @IsOptional()
  @IsString({ message: 'O celular deve ser uma string válida.' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'A data de nascimento deve ser uma string válida.' })
  birthDate?: string;

  @IsOptional()
  @IsString({ message: 'O estado civil deve ser uma string válida.' })
  maritalStatus?: MaritalType;

  @IsOptional()
  @IsObject({ message: 'A empresa deve ser um objeto válido.' })
  company?: any;

  @IsOptional()
  @IsObject({ message: 'O endereço deve ser um objeto válido.' })
  address?: any;

  @IsOptional()
  @IsArray({ message: 'A soft skill deve ser uma string válida.' })
  softSkills?: Array<string>;

  @IsOptional()
  @IsArray({ message: 'A hard skill deve ser uma string válida.' })
  hardSkills?: Array<string>;
}
