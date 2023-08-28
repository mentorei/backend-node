import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cpfValidator } from 'src/utils/utils';

@Injectable()
@ValidatorConstraint({ async: false })
export class IsCPFValidator implements ValidatorConstraintInterface {
  public validate(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/.test(value)) {
      return false;
    }

    return cpfValidator(value);
  }

  public defaultMessage(): string {
    return `O CPF precisa ser válido.`;
  }
}

export const IsCPF = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'IsCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCPFValidator,
    });
  };
};
