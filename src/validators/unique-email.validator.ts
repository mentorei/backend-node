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
export class UniqueUserEmailValidator implements ValidatorConstraintInterface {
  constructor(@Inject(forwardRef(() => PrismaClient)) private readonly $prisma: PrismaClient) {}

  public async validate(email: any): Promise<boolean> {
    const existingUser = await this.$prisma.user.findUnique({
      where: { email },
    });
    return !existingUser;
  }

  public defaultMessage(): string {
    return 'Já existe um usuário com este e-mail.';
  }
}

export const UniqueUserEmail = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'UniqueUserEmail',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueUserEmailValidator,
    });
  };
};
