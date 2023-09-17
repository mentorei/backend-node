import { Type } from 'class-transformer';
import { GenderType, MaritalType } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { UpdateMentorDTO } from '../mentor/update-mentor.input';
import { UpdateMenteeDTO } from '../mentee/update-mentee.input';
import { UpdateUserCompanyDTO } from './user-company/update-user-company.input';
import { UpdateUserAddressDTO } from './user-address/update-user-address.input';

export class UpdateUserDTO {
  @IsUUID(4, { message: 'ID de usuário inválido.' })
  id: string;

  @IsOptional()
  @IsEnum(GenderType, { message: 'O gênero deve ser válido.' })
  gender?: GenderType;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O documento deve ser uma string válida.' })
  document?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O avatar deve ser uma string válida.' })
  avatar?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O celular deve ser uma string válida.' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A data de nascimento deve ser uma string válida.' })
  birthDate?: string;

  @IsOptional()
  @IsEnum(MaritalType, { message: 'O estado civil deve ser válido.' })
  maritalStatus?: MaritalType;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserCompanyDTO)
  company?: any;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserAddressDTO)
  address?: any;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateMentorDTO)
  mentor?: any;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateMenteeDTO)
  mentee?: any;

  @IsOptional()
  @IsArray({ message: 'A habilidade deve ser uma string válida.' })
  skills?: Array<string>;
}
