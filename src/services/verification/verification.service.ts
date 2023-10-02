import * as moment from 'moment-timezone';
import { Injectable } from '@nestjs/common';
import { PrismaClient, VerificationType } from '@prisma/client';

import { UserEntity } from 'src/entities/user/user.entity';
import { VerificationEntity } from 'src/entities/verification/verification.entity';

@Injectable()
export class VerificationService {
  constructor(private readonly $prisma: PrismaClient) {}

  public async passwordReset(user: UserEntity): Promise<VerificationEntity> {
    // Invalidate other codes.
    await this.$prisma.verification.updateMany({
      where: { userId: user.id, type: 'PASSWORD_RESET', isValid: true },
      data: { isValid: false },
    });

    // CREATE CODE
    const code = Math.random().toString().substring(2, 8);

    return this.$prisma.verification.create({
      data: { isValid: true, userId: user.id, type: 'PASSWORD_RESET', code },
      include: {
        user: true,
      },
    });
  }

  public async validateVerificationCode(
    user: UserEntity,
    type: VerificationType,
    code: string
  ): Promise<VerificationEntity> {
    const verification = await this.$prisma.verification.findFirst({
      where: { deleted: null, isValid: true, code, userId: user.id, type },
      include: {
        user: true,
      },
    });

    if (!verification) {
      throw new Error('Código inexistente. Tente novamente mais tarde.');
    }

    const createdAt = moment(verification.createdAt).add(1, 'day').format();
    const now = moment().format();

    // INVALID AFTER 24 HOURS
    if (moment(now).isAfter(createdAt)) {
      throw new Error('Código inválido. Gere um novo código para alterar sua senha.');
    }

    return verification;
  }
}
