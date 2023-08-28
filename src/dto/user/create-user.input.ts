import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

import { IsCPF } from 'src/validators/is-cpf.validator';
import { UniqueUserCPF } from 'src/validators/unique-cpf.validator';
import { UniqueUserEmail } from 'src/validators/unique-email.validator';

export class CreateUserDTO {
  @IsString()
  @IsEmail(undefined, { message: 'O e-mail informado é inválido.' })
  @UniqueUserEmail()
  email: string;

  @IsString()
  @IsCPF()
  @UniqueUserCPF()
  cpf: string;

  @IsString()
  @Matches(/^([A-zÀ-ú]{3,})+\s+([A-zÀ-ú\s]{2,})+$/i, {
    message: 'Digite o seu nome completo.',
  })
  name: string;

  @IsString()
  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres.' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/, {
    message: 'Sua senha deve conter pelo menos uma letra maiúscula, um número e um caracter especial.',
  })
  password: string;
}
