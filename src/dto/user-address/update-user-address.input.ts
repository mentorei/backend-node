import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateUserAddressDTO {
  @IsOptional()
  @IsUUID(undefined, { message: 'ID de usuário inválido.' })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O CEP deve ser uma string válida.' })
  postalCode?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A cidade deve ser uma string válida.' })
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O estado deve ser uma string válida.' })
  state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A rua deve ser uma string válida.' })
  street?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O número de endereço precisa ser maior que zero' })
  number?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O bairro deve ser uma string válida.' })
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O país deve ser uma string válida.' })
  country?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O complemento do nascimento deve ser uma string válida.' })
  complement?: string;
}
