import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueUserCPFValidator implements ValidatorConstraintInterface {
  constructor(@Inject(forwardRef(() => PrismaClient)) private readonly $prisma: PrismaClient) {}

  public async validate(cpf: any): Promise<boolean> {
    const existingUser = await this.$prisma.user.findUnique({
      where: { cpf },
    });
    return !existingUser;
  }

  public defaultMessage(): string {
    return 'Já existe um usuário com este CPF.';
  }
}

export const UniqueUserCPF = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'UniqueUserCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueUserCPFValidator,
    });
  };
};
