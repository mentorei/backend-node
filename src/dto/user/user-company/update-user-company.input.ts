import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserCompanyDTO {
  @IsOptional()
  @IsUUID(4, { message: 'ID de usuário inválido.' })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O nome da empresa deve ser uma string válida.' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O cargo deve ser uma string válida.' })
  responsibility?: string;
}
